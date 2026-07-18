from typing import Annotated, TypedDict
from pathlib import Path
from langgraph.checkpoint.memory import InMemorySaver
from langchain_tavily import TavilySearch
import os
from langchain_core.tools import tool
from langchain.chat_models import init_chat_model
from langgraph.types import Command, interrupt
from langgraph.graph import END, START, StateGraph, add_messages
from BasicToolNode import BasicToolNode
from displayGraph import displayGraph
from langgraph.prebuilt import ToolNode, tools_condition

memory = InMemorySaver()

os.environ["LANGSMITH_API_KEY"] = ""
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_PROJECT"] = "travel-agent"

class State(TypedDict):
    # Messages have the type "list". The `add_messages` function
    # in the annotation defines how this state key should be updated
    # (in this case, it appends messages to the list, rather than overwriting them)
    messages: Annotated[list, add_messages]


graph_builder = StateGraph(State)

os.environ["AZURE_OPENAI_ENDPOINT"] = "https://ai-lllqq20068447ai119054887237.openai.azure.com/"
os.environ["OPENAI_API_VERSION"] = "2024-12-01-preview"
os.environ["AZURE_OPENAI_DEPLOYMENT_NAME"] = "gpt-5.2-chat"
os.environ["TAVILY_API_KEY"] = ""

llm = init_chat_model(
    "azure_openai:gpt-4.1",
    azure_deployment=os.environ["AZURE_OPENAI_DEPLOYMENT_NAME"],
)

@tool
def human_assistance(query: str) -> str:
    """Request assistance from a human."""
    human_response = interrupt({"query": query})
    return human_response["data"]

tool = TavilySearch(max_results=2)
tools = [tool,human_assistance]

llm_with_tools = llm.bind_tools(tools)

def chatbot(state: State):
    return {"messages": [llm_with_tools.invoke(state["messages"])]}

tool_node = ToolNode(tools)
graph_builder.add_node("chatbot", chatbot)
graph_builder.add_node("tool_node", tool_node)

def route_tools(
    state: State,
):
    """
    Use in the conditional_edge to route to the ToolNode if the last message
    has tool calls. Otherwise, route to the end.
    """
    if isinstance(state, list):
        ai_message = state[-1]
    elif messages := state.get("messages", []):
        ai_message = messages[-1]
    else:
        raise ValueError(f"No messages found in input state to tool_edge: {state}")
    if hasattr(ai_message, "tool_calls") and len(ai_message.tool_calls) > 0:
        return "tool_node"
    return END

graph_builder.add_conditional_edges("chatbot", route_tools, {"tool_node": "tool_node", END: END})
graph_builder.add_edge("tool_node", "chatbot")
graph_builder.add_edge(START, "chatbot")
graph = graph_builder.compile(checkpointer=memory)

def stream_graph_updates(user_input: str, config=None):
    for event in graph.stream(
        {"messages": [{"role": "user", "content": user_input}]},
        config=config,
        stream_mode="values",
    ):
        if "__interrupt__" in event:
            interrupt_event = event["__interrupt__"][0]
            interrupt_value = getattr(interrupt_event, "value", {}) or {}
            query = interrupt_value.get("query", "Tool requires human input")
            print(f"Tool requires human input: {query}")
            human_reply = input("Human: ")

            for resumed_event in graph.stream(
                Command(resume={"data": human_reply}),
                config=config,
                stream_mode="values",
            ):
                if "messages" in resumed_event:
                    resumed_event["messages"][-1].pretty_print()
            continue

        if "messages" in event:
            event["messages"][-1].pretty_print()


while True:
    #try:
        i = 1
        config = {"configurable": {"thread_id": str(i)}}
        user_input = input("User: ")
        if user_input.lower() in ["quit", "exit", "q"]:
            print("Goodbye!")
            break

        stream_graph_updates(user_input, config=config)
    #except:
    #    # fallback if input() is not available
    #    user_input = "What do you know about LangGraph?"
    #    print("User: " + user_input)
    #    stream_graph_updates(user_input, config=config)
    #    break
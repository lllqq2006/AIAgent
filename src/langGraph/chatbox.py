
from typing import Annotated
import os
from langchain_openai import AzureChatOpenAI
from langchain.chat_models import init_chat_model
from typing_extensions import TypedDict

from langgraph.graph import StateGraph, START
from langgraph.graph.message import add_messages

from langgraph.checkpoint.memory import MemorySaver

memory = MemorySaver()

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

llm = init_chat_model(
    "azure_openai:gpt-5.2",
    azure_deployment=os.environ["AZURE_OPENAI_DEPLOYMENT_NAME"],
)

def chatbot(state: State):
    return {"messages": [llm.invoke(state["messages"])]}

graph_builder.add_node("chatbot", chatbot)

graph_builder.add_edge(START, "chatbot")

graph = graph_builder.compile(checkpointer=memory)

config = {"configurable": {"thread_id": "1"}}
config2 = {"configurable": {"thread_id": "2"}}

def stream_graph_updates(user_input: str, config=None):
    events = graph.stream({"messages": [{"role": "user", "content": user_input}]}, config=config)
    print("Graph events:")
    print(events)
    for event in events:
        values = event.values()
        print("Graph values:")
        print(values)
        for value in values:
            print("Assistant:", value["messages"][-1].content)

while True:
    try:
        i = 1
        config = {"configurable": {"thread_id": str(i)}}
        user_input = input("User: ")
        if user_input.lower() in ["quit", "exit", "q"]:
            print("Goodbye!")
            break
        stream_graph_updates(user_input, config=config)
    except:
        # fallback if input() is not available
        user_input = "What do you know about LangGraph?"
        print("User: " + user_input)
        stream_graph_updates(user_input)
        break
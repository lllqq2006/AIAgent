from typing import Annotated
from typing_extensions import TypedDict
from langchain_openai import AzureChatOpenAI
from langchain.chat_models import init_chat_model
from langgraph.graph.message import add_messages
from langgraph.graph import StateGraph, START, END
from dotenv import load_dotenv

load_dotenv()

class State(TypedDict):
    messages: Annotated[list, add_messages]

llm = init_chat_model(
    "azure_openai:gpt-5.2",
    azure_deployment="gpt-5.2-chat",
)

response = llm.invoke([{"role": "user", "content": "Hello, how are you?"}])

def chatbot(state: State):
    return {"messages": [llm.invoke(state["messages"])]}

graph_builder = StateGraph(State)
graph_builder.add_node("chatbot", chatbot)
graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", END)

graph = graph_builder.compile()

def stream_graph_updates(user_input: str):
    for event in graph.stream({"messages": [{"role": "user", "content": user_input}]}):
        values = event.values()
        for value in values:
            print(value["messages"][-1].content)

while True:
    try:
        user_input = input("User: ")
        if user_input.lower() in ["exit", "quit"]:
            print("\nExiting...")
            break
        stream_graph_updates(user_input)
    except:
        print("\nExiting...")
        break


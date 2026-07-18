from pydantic import BaseModel
import os
from langchain.agents import create_agent
from langchain_openai import AzureChatOpenAI
from langgraph.checkpoint.memory import InMemorySaver

def get_weather(city: str) -> str:  
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"

checkpointer = InMemorySaver()

class WeatherOutput(BaseModel):
    city: str
    weather: str
    description: str

model = AzureChatOpenAI(
    azure_endpoint="https://ai-lllqq20068447ai119054887237.openai.azure.com/",
    azure_deployment="gpt-5.2-chat",
    openai_api_version="2024-12-01-preview",
    api_key=os.environ["AZURE_OPENAI_API_KEY"],
)

agent = create_agent(
    model=model,
    tools=[get_weather],  
    system_prompt="You are a helpful assistant",
    checkpointer=checkpointer,
    response_format=WeatherOutput
)
config = {"configurable": {"thread_id": "1"}}

# Run the agent
result = agent.invoke(
    {"messages": [{"role": "user", "content": "what is the weather in sf"}]},
    config=config,
)

result2 = agent.invoke(
    {"messages": [{"role": "user", "content": "how about nyc"}]},
    config=config,
)

print("First result:")
print(result)

message = result2["messages"]
for msg in message:
    print(f"{getattr(msg, 'type', 'unknown')}: {getattr(msg, 'content', '')}")


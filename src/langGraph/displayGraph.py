import os
from pathlib import Path
from langgraph.graph.state import StateGraph

def displayGraph(graph: StateGraph) -> None:
    """
    Display the graph in a human-readable format.
    """
    try:
        png_bytes = graph.get_graph().draw_mermaid_png()
        from IPython.display import Image, display

        # In notebooks, display inline; in terminal, persist to file for viewing.
        if "JPY_PARENT_PID" in os.environ or "ipykernel" in os.environ:
            display(Image(png_bytes))
        else:
            output_path = Path(__file__).with_name("graph_preview.png")
            output_path.write_bytes(png_bytes)
            print(f"Graph image saved to: {output_path}")
    except Exception:
        # This requires some extra dependencies and is optional
        pass

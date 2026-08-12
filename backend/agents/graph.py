from langgraph.graph import StateGraph, START, END
from models.state import DocumentGenerationState
from agents.nodes import router_node, planner_node, generator_node, builder_node, finisher_node


def create_document_graph():
    """Create and compile the LangGraph state machine for document generation."""

    graph = StateGraph(DocumentGenerationState)

    graph.add_node("router", router_node)
    graph.add_node("planner", planner_node)
    graph.add_node("generator", generator_node)
    graph.add_node("builder", builder_node)
    graph.add_node("finisher", finisher_node)

    graph.add_edge(START, "router")
    graph.add_edge("router", "planner")
    graph.add_edge("planner", "generator")
    graph.add_edge("generator", "builder")
    graph.add_edge("builder", "finisher")
    graph.add_edge("finisher", END)

    return graph.compile()


document_agent = create_document_graph()

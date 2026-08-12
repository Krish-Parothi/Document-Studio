from langchain_core.messages import HumanMessage
from models.state import DocumentGenerationState
from agents.graph import document_agent


async def generate_document_async(
    user_prompt: str,
    doc_type: str = None,
    style_params: dict = None,
) -> DocumentGenerationState:
    """Run the document generation agent."""

    initial_state: DocumentGenerationState = {
        "messages": [HumanMessage(content=user_prompt)],
        "user_prompt": user_prompt,
        "document_type": doc_type,
        "style_params": style_params or {},
        "content_plan": None,
        "generated_content": None,
        "file_path": None,
        "file_name": None,
        "error": None,
    }

    result = document_agent.invoke(initial_state)
    return result


def generate_document(
    user_prompt: str,
    doc_type: str = None,
    style_params: dict = None,
) -> DocumentGenerationState:
    """Synchronous wrapper for document generation."""
    import asyncio

    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

    return loop.run_until_complete(
        generate_document_async(user_prompt, doc_type, style_params)
    )

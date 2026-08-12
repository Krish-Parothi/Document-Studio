from langchain_core.messages import HumanMessage, AIMessage
from models.state import DocumentGenerationState
from utils.prompts import ROUTER_PROMPT, PLANNER_PROMPT, GENERATOR_PROMPT
from langchain_groq import ChatGroq
from config.settings import settings


llm = ChatGroq(
    model="mixtral-8x7b-32768",
    temperature=0.7,
    api_key=settings.groq_api_key
)


def router_node(state: DocumentGenerationState) -> DocumentGenerationState:
    """Determine document type from user prompt."""
    if state.get("document_type"):
        return state

    prompt = ROUTER_PROMPT.format(user_prompt=state["user_prompt"])
    response = llm.invoke([HumanMessage(content=prompt)])
    doc_type = response.content.strip().lower()

    if doc_type not in ["pdf", "docx", "xlsx"]:
        doc_type = "pdf"

    state["document_type"] = doc_type
    state["messages"].append(response)
    return state


def planner_node(state: DocumentGenerationState) -> DocumentGenerationState:
    """Create a content plan for the document."""
    prompt = PLANNER_PROMPT.format(
        doc_type=state["document_type"],
        user_prompt=state["user_prompt"]
    )
    response = llm.invoke([HumanMessage(content=prompt)])

    state["content_plan"] = response.content
    state["messages"].append(response)
    return state


def generator_node(state: DocumentGenerationState) -> DocumentGenerationState:
    """Generate content using the plan."""
    prompt = GENERATOR_PROMPT.format(
        doc_type=state["document_type"],
        user_prompt=state["user_prompt"],
        content_plan=state["content_plan"]
    )
    response = llm.invoke([HumanMessage(content=prompt)])

    state["generated_content"] = response.content
    state["messages"].append(response)
    return state


def builder_node(state: DocumentGenerationState) -> DocumentGenerationState:
    """Build the document using the appropriate tool."""
    from tools.pdf_tool import generate_pdf
    from tools.docx_tool import generate_docx
    from tools.excel_tool import generate_xlsx
    from utils.file_manager import generate_filename, get_file_path

    doc_type = state["document_type"]
    filename = generate_filename(doc_type)
    file_path = get_file_path(filename)

    try:
        style_params = state.get("style_params", {})

        if doc_type == "pdf":
            generate_pdf(state["generated_content"], style_params, file_path)
        elif doc_type == "docx":
            generate_docx(state["generated_content"], style_params, file_path)
        elif doc_type == "xlsx":
            generate_xlsx(state["generated_content"], style_params, file_path)

        state["file_path"] = file_path
        state["file_name"] = filename
    except Exception as e:
        state["error"] = str(e)

    return state


def finisher_node(state: DocumentGenerationState) -> DocumentGenerationState:
    """Validate and finalize the response."""
    if state.get("error"):
        return state

    if not state.get("file_path"):
        state["error"] = "Failed to generate document file"

    return state

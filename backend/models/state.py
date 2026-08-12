from typing import TypedDict, Optional, List
from langchain_core.messages import BaseMessage


class DocumentGenerationState(TypedDict):
    messages: List[BaseMessage]
    user_prompt: str
    document_type: Optional[str]
    style_params: dict
    content_plan: Optional[str]
    generated_content: Optional[str]
    file_path: Optional[str]
    file_name: Optional[str]
    error: Optional[str]

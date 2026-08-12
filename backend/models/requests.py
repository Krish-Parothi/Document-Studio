from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, Literal


class StyleParams(BaseModel):
    font_family: str = Field(default="Arial", description="Font family for the document")
    font_size: int = Field(default=12, description="Font size in points")
    text_color: str = Field(default="#000000", description="Text color in hex format")
    background_color: str = Field(default="#FFFFFF", description="Background color in hex format")
    line_spacing: float = Field(default=1.0, description="Line spacing multiplier")


class DocumentRequest(BaseModel):
    prompt: str = Field(..., description="User's document generation request")
    doc_type: Optional[Literal["pdf", "docx", "xlsx"]] = Field(
        default=None, description="Document type. If not specified, agent will determine it."
    )
    style_params: Optional[StyleParams] = Field(default_factory=StyleParams, description="Style parameters")


class DocumentResponse(BaseModel):
    success: bool
    message: str
    file_name: Optional[str] = None
    doc_type: Optional[str] = None
    error: Optional[str] = None


class HealthCheckResponse(BaseModel):
    status: str
    groq_connected: bool
    message: str

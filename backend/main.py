from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
from models.requests import DocumentRequest, DocumentResponse, HealthCheckResponse, StyleParams
from agents.document_agent import generate_document
from utils.file_manager import cleanup_file
from config.settings import settings

app = FastAPI(title="Document Studio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"status": "ok", "message": "Document Studio API is running"}


@app.get("/api/health", response_model=HealthCheckResponse)
def health_check():
    """Health check endpoint with Groq connectivity test."""
    try:
        from langchain_groq import ChatGroq
        from langchain_core.messages import HumanMessage

        llm = ChatGroq(model="mixtral-8x7b-32768", api_key=settings.groq_api_key)
        llm.invoke([HumanMessage(content="test")])

        return HealthCheckResponse(
            status="healthy",
            groq_connected=True,
            message="Document Studio API is operational"
        )
    except Exception as e:
        return HealthCheckResponse(
            status="degraded",
            groq_connected=False,
            message=f"Groq connection issue: {str(e)}"
        )


@app.post("/api/generate", response_model=DocumentResponse)
def generate_document_endpoint(request: DocumentRequest):
    """Generate a document based on user prompt and parameters."""
    try:
        style_params = request.style_params.dict() if request.style_params else {}

        result = generate_document(
            user_prompt=request.prompt,
            doc_type=request.doc_type,
            style_params=style_params
        )

        if result.get("error"):
            raise HTTPException(status_code=400, detail=result["error"])

        if not result.get("file_path"):
            raise HTTPException(status_code=500, detail="Failed to generate document")

        return DocumentResponse(
            success=True,
            message="Document generated successfully",
            file_name=result["file_name"],
            doc_type=result["document_type"]
        )

    except HTTPException:
        raise
    except Exception as e:
        return DocumentResponse(
            success=False,
            message="Error generating document",
            error=str(e)
        )


@app.get("/api/download/{file_name}")
def download_document(file_name: str):
    """Download a generated document file."""
    from utils.file_manager import get_file_path

    try:
        file_path = get_file_path(file_name)

        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")

        def cleanup():
            cleanup_file(file_path)

        return FileResponse(
            path=file_path,
            media_type="application/octet-stream",
            filename=file_name,
            background=cleanup
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

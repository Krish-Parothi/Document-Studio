from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Document Studio API", version="1.0.0")

# Allow CORS for frontend
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

@app.post("/api/generate")
def generate_document(prompt: str):
    # TODO: Connect LangGraph agent here
    return {"status": "success", "artifact": f"Mock generated content for: {prompt}"}

# Document Studio Backend

A FastAPI-based agentic document generation system powered by LangGraph and Groq LLM.

## Overview

This backend implements an intelligent document generation agent that:
- Analyzes user requests to determine document type (PDF, Word, Excel)
- Plans document content structure
- Generates document content using Groq LLM
- Converts content to formatted documents
- Serves files for download

## Architecture

### LangGraph Workflow

The document generation process uses a 5-node LangGraph state machine:

```
START → router → planner → generator → builder → finisher → END
```

**Nodes:**
- **router**: Analyzes prompt to determine document type (pdf, docx, xlsx)
- **planner**: Creates structured content outline
- **generator**: Generates document content via Groq LLM
- **builder**: Routes to appropriate document tool
- **finisher**: Validates and finalizes response

### Project Structure

```
backend/
├── main.py                 # FastAPI application and endpoints
├── .env                    # Environment configuration (local)
├── .env.example           # Environment template
├── config/
│   └── settings.py        # Configuration management
├── models/
│   ├── requests.py        # Pydantic request/response schemas
│   └── state.py          # LangGraph state schema
├── agents/
│   ├── nodes.py          # LangGraph node implementations
│   ├── graph.py          # State graph definition
│   └── document_agent.py # Agent entry point
├── tools/
│   ├── pdf_tool.py       # PDF generation (reportlab)
│   ├── docx_tool.py      # Word generation (python-docx)
│   └── excel_tool.py     # Excel generation (openpyxl)
└── utils/
    ├── prompts.py        # LLM prompts for each node
    └── file_manager.py   # Temp file handling
```

## Setup

### Prerequisites

- Python 3.12+
- `uv` package manager
- Groq API key (get from https://console.groq.com)

### Installation

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create `.env` file with Groq API key:
   ```bash
   cp .env.example .env
   # Edit .env and add your Groq API key
   ```

3. Install dependencies:
   ```bash
   uv sync
   ```

4. Start the development server:
   ```bash
   uv run uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000` with documentation at `http://localhost:8000/docs`.

## API Endpoints

### POST `/api/generate`

Generate a document from a user prompt.

**Request:**
```json
{
  "prompt": "Generate a business report about Q4 sales",
  "doc_type": "pdf",
  "style_params": {
    "font_family": "Arial",
    "font_size": 12,
    "text_color": "#000000",
    "line_spacing": 1.0
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Document generated successfully",
  "file_name": "document_a1b2c3d4.pdf",
  "doc_type": "pdf"
}
```

**Parameters:**
- `prompt` (required): User's document generation request
- `doc_type` (optional): "pdf", "docx", or "xlsx". If not specified, agent determines it
- `style_params` (optional): Formatting options:
  - `font_family`: "Arial", "Times", "Courier", "Helvetica" (default: Arial)
  - `font_size`: 8-28 (default: 12)
  - `text_color`: Hex color code (default: #000000)
  - `background_color`: Hex color code (default: #FFFFFF)
  - `line_spacing`: 0.8-2.0 (default: 1.0)

### GET `/api/health`

Health check endpoint with Groq connectivity verification.

**Response:**
```json
{
  "status": "healthy",
  "groq_connected": true,
  "message": "Document Studio API is operational"
}
```

### GET `/api/download/{file_name}`

Download a generated document file.

**Response:** File download as binary

## Document Generation Flow

1. **User Input**: Frontend sends prompt and optional parameters
2. **Router Node**: LLM determines document type from prompt keywords
3. **Planner Node**: Creates detailed content outline
4. **Generator Node**: Generates full document content using Groq
5. **Builder Node**: Converts content to appropriate format:
   - **PDF**: Uses reportlab for professional formatting
   - **Word**: Uses python-docx for editable documents
   - **Excel**: Uses openpyxl for spreadsheets with data
6. **Finisher Node**: Validates file and prepares response
7. **Download**: File served to frontend with auto-cleanup

## Document Type Detection

The router node uses LLM to analyze the prompt:
- Keywords like "report", "document", "invoice" → PDF
- Keywords like "letter", "memo", "proposal" → Word
- Keywords like "spreadsheet", "table", "data", "expenses" → Excel
- Explicit `doc_type` parameter overrides detection

## Configuration

### Environment Variables

Required:
- `GROQ_API_KEY`: Your Groq API key

Optional:
- `ENVIRONMENT`: "development" or "production" (default: development)
- `SUPABASE_URL`: Supabase project URL (for future storage features)
- `SUPABASE_KEY`: Supabase API key (for future storage features)

## LLM Configuration

The system uses Groq's `mixtral-8x7b-32768` model:
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max tokens**: Default (no limit specified)
- **Provider**: Groq API

### Customizing the Model

Edit `backend/agents/nodes.py` to change the model:
```python
llm = ChatGroq(
    model="mixtral-8x7b-32768",  # Change this
    temperature=0.7,
    api_key=settings.groq_api_key
)
```

Available Groq models: https://console.groq.com/docs/models

## Testing

### Manual Testing

1. **Health Check:**
   ```bash
   curl http://localhost:8000/api/health
   ```

2. **Generate PDF:**
   ```bash
   curl -X POST http://localhost:8000/api/generate \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Generate a business report about Q4 sales", "doc_type": "pdf"}'
   ```

3. **Generate Word:**
   ```bash
   curl -X POST http://localhost:8000/api/generate \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Write a professional letter of recommendation", "doc_type": "docx"}'
   ```

4. **Generate Excel:**
   ```bash
   curl -X POST http://localhost:8000/api/generate \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Create a spreadsheet of monthly sales figures", "doc_type": "xlsx"}'
   ```

### Integration Testing

See root `README.md` for full end-to-end testing with frontend.

## Troubleshooting

### Groq API Key Error
- Verify `.env` file exists and contains valid `GROQ_API_KEY`
- Check key is from https://console.groq.com

### Document Generation Fails
- Check `/api/health` endpoint to verify Groq connectivity
- Look at server logs for detailed error messages
- Verify prompt is clear and specific

### File Download Issues
- Check `tmp/` directory exists and is writable
- Verify file permissions
- Check available disk space

## Performance Notes

- Document generation typically takes 2-10 seconds depending on complexity
- Large documents or detailed requests take longer
- Groq API rate limits apply (currently generous for free tier)

## Future Enhancements

- [ ] Document storage with Supabase
- [ ] Document history and retrieval
- [ ] Multi-document batching
- [ ] Custom agent workflows
- [ ] Document editing capabilities
- [ ] Template system for recurring document types

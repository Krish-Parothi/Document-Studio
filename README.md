# Document Studio

An agentic AI application for generating documents (PDF, Word, Excel) using LangGraph, LangChain, and Groq LLM.

## Overview

Document Studio combines a modern Next.js frontend with a Python FastAPI backend powered by an intelligent LangGraph agent. Users describe the document they want, and the AI agent:

1. Determines the document type (PDF, Word, Excel)
2. Plans the content structure
3. Generates professional content using Groq LLM
4. Formats it in the requested document type
5. Returns it for download

## Architecture

- **Frontend**: Next.js 16 + React 19 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: FastAPI + Python 3.12 + LangGraph + LangChain + Groq LLM
- **Document Tools**: reportlab (PDF), python-docx (Word), openpyxl (Excel)
- **Package Managers**: npm (frontend), uv (backend)

## Prerequisites

- Node.js v18+
- Python 3.12+
- `uv` package manager (`pip install uv`)
- Groq API key (free from https://console.groq.com)

## Quick Start

### Backend Setup

1. Navigate to backend:
   ```bash
   cd backend
   ```

2. Create environment configuration:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=gsk_your_actual_key_here
   ```

4. Install dependencies:
   ```bash
   uv sync
   ```

5. Start the development server:
   ```bash
   uv run uvicorn main:app --reload
   ```

   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. In a new terminal, navigate to frontend:
   ```bash
   cd frontend
   ```

2. Install dependencies (if needed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   Frontend will be available at `http://localhost:3000`

## Testing the Application

### 1. Verify Backend Connectivity

```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "groq_connected": true,
  "message": "Document Studio API is operational"
}
```

### 2. Generate PDF Document

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a comprehensive business report for Q4 2024 sales performance including market analysis, revenue trends, and growth opportunities",
    "doc_type": "pdf"
  }'
```

### 3. Generate Word Document

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Draft a professional non-disclosure agreement between two software companies",
    "doc_type": "docx"
  }'
```

### 4. Generate Excel Spreadsheet

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a monthly expense tracking spreadsheet with categories for Q4",
    "doc_type": "xlsx"
  }'
```

### 5. Test via UI

1. Open http://localhost:3000/generate in your browser
2. You should see a chat interface with the Document Agent
3. Type a request like: "Generate an NDA between Company A and Company B"
4. Customize style parameters if desired (font, size, color)
5. Click send and wait for generation
6. Click "Download PDF/DOCX/XLSX" to get your document

### Test Cases

**PDF Generation:**
- "Generate a business report about Q4 sales"
- "Create an invoice for consulting services"
- "Write a technical documentation for a software API"

**Word Generation:**
- "Draft a letter of recommendation"
- "Write a professional proposal"
- "Create a meeting agenda document"

**Excel Generation:**
- "Create a spreadsheet of monthly expenses"
- "Generate a sales tracking table with monthly figures"
- "Make a project budget spreadsheet"

**With Style Parameters:**
- Customize font (Arial, Times, Courier, Helvetica)
- Adjust font size (8-28 points)
- Change text color with color picker
- Modify line spacing

## Project Structure

```
Document-Studio/
├── backend/                    # Python FastAPI backend
│   ├── main.py                # FastAPI application and endpoints
│   ├── pyproject.toml         # Python dependencies
│   ├── .env.example           # Environment template
│   ├── config/                # Configuration management
│   ├── models/                # Pydantic schemas
│   ├── agents/                # LangGraph workflow
│   ├── tools/                 # Document generation tools
│   ├── utils/                 # Helper utilities
│   └── README.md              # Backend documentation
│
└── frontend/                   # Next.js React frontend
    ├── package.json           # Node dependencies
    ├── src/
    │   ├── app/              # Next.js app router
    │   ├── components/       # React components
    │   ├── lib/              # Utilities and API client
    │   └── app/globals.css   # Global styles
    ├── tailwind.config.ts    # Tailwind configuration
    └── README.md             # Frontend documentation
```

## Backend API

Full API documentation available at `http://localhost:8000/docs` when backend is running.

### Key Endpoints

- `GET /` - Health check
- `GET /api/health` - Detailed health check with Groq connectivity
- `POST /api/generate` - Generate a document
- `GET /api/download/{file_name}` - Download generated document

See [backend/README.md](backend/README.md) for detailed API documentation.

## Features

✅ **Agentic AI**: LangGraph workflow with intelligent routing
✅ **Multiple Formats**: PDF, Word, Excel support
✅ **Smart Routing**: AI determines document type from prompt
✅ **Style Customization**: Font, size, color, spacing options
✅ **Fast Generation**: Groq LLM for rapid content generation
✅ **Clean UI**: Modern interface with real-time chat
✅ **Error Handling**: Graceful error messages and validation
✅ **Production Ready**: Proper state management and cleanup

## Development

### Backend Development

- Edit `backend/agents/nodes.py` to modify agent behavior
- Edit `backend/tools/*.py` to change document formatting
- Edit `backend/utils/prompts.py` to adjust LLM prompts
- Run tests: `uv run pytest` (requires pytest installation)

### Frontend Development

- Edit `frontend/src/app/generate/page.tsx` for UI changes
- Edit `frontend/src/lib/api.ts` for API client changes
- Edit `frontend/src/components/parameter-input.tsx` for style options
- Run with `npm run dev` for live reload

### Adding New Document Types

1. Create `backend/tools/newformat_tool.py` with generation function
2. Update router prompt in `backend/utils/prompts.py` to recognize new type
3. Add type to `models/requests.py` type hints
4. Import and use in `backend/agents/nodes.py` builder_node
5. Test via API and UI

## Troubleshooting

### Backend won't start
- Check Python 3.12+: `python --version`
- Verify `uv` is installed: `uv --version`
- Verify `.env` file exists with valid `GROQ_API_KEY`

### Frontend shows "Backend not connected"
- Verify backend is running at `http://localhost:8000`
- Check CORS settings in `backend/main.py`
- Check browser console for specific errors

### Document generation fails
- Check health endpoint: `curl http://localhost:8000/api/health`
- Verify Groq API key is valid
- Check backend server logs for error details
- Try simpler prompts first

### Files not downloading
- Check `backend/tmp/` directory has write permissions
- Verify disk space available
- Check browser's download settings

## Performance

- Document generation: 2-10 seconds typical
- Depends on document complexity and prompt detail
- Groq API has generous rate limits on free tier
- Temporary files auto-cleanup after download

## Environment Variables

**Backend (.env):**
- `GROQ_API_KEY` (required): Your Groq API key
- `ENVIRONMENT`: "development" or "production"
- `SUPABASE_URL`: (optional) Supabase URL for future features
- `SUPABASE_KEY`: (optional) Supabase key for future features

**Frontend (.env.local):**
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:8000)

## Future Enhancements

- [ ] Document storage and history
- [ ] Multi-document generation
- [ ] Custom templates
- [ ] Document editing interface
- [ ] Real-time collaboration
- [ ] Advanced formatting options
- [ ] Document templates library
- [ ] Batch document generation

## Contributing

See individual README files in `backend/` and `frontend/` for detailed development guides.

## License

MIT

## Support

For issues and questions, check:
- [Backend README](backend/README.md) for API details
- [Frontend README](frontend/README.md) for UI details
- Backend server logs at `http://localhost:8000/docs`

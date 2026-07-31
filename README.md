# Document Studio

Document Studio is a full-stack application for generating and managing documents using AI.

## Architecture

The project consists of two main parts:
- **Frontend**: A modern web application built with Next.js, React, Tailwind CSS, shadcn/ui, and Supabase.
- **Backend**: A robust REST API powered by Python, FastAPI, Langchain, LangGraph, and Supabase.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.12+
- `uv` (Python package manager)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
The frontend will be available at `http://localhost:3000`.

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies using `uv`:
   ```bash
   uv sync
   ```
3. Start the FastAPI development server:
   ```bash
   uv run uvicorn main:app --reload
   ```
The backend API will be available at `http://localhost:8000` and the API documentation at `http://localhost:8000/docs`.

## Features
- AI-driven document generation (via LangChain and LangGraph)
- Modern, responsive UI using React and shadcn/ui
- Integration with Supabase
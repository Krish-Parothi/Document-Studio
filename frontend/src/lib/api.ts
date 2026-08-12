const API_BASE = "http://localhost:8000";

export interface StyleParams {
  font_family?: string;
  font_size?: number;
  text_color?: string;
  background_color?: string;
  line_spacing?: number;
}

export interface DocumentRequest {
  prompt: string;
  doc_type?: "pdf" | "docx" | "xlsx";
  style_params?: StyleParams;
}

export interface DocumentResponse {
  success: boolean;
  message: string;
  file_name?: string;
  doc_type?: string;
  error?: string;
}

export async function generateDocument(request: DocumentRequest): Promise<DocumentResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to generate document");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function downloadDocument(fileName: string): Promise<Blob> {
  try {
    const response = await fetch(`${API_BASE}/api/download/${fileName}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to download document");
    }

    return await response.blob();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Download failed");
  }
}

export function triggerDownload(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    return await response.json();
  } catch (error) {
    return { status: "error", groq_connected: false };
  }
}

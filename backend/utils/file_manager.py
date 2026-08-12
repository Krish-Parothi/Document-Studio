import os
import uuid
from pathlib import Path


TMP_DIR = Path("tmp")


def ensure_tmp_dir():
    TMP_DIR.mkdir(exist_ok=True)


def generate_filename(doc_type: str) -> str:
    ext_map = {"pdf": ".pdf", "docx": ".docx", "xlsx": ".xlsx"}
    ext = ext_map.get(doc_type, ".txt")
    filename = f"document_{uuid.uuid4().hex[:8]}{ext}"
    return filename


def get_file_path(filename: str) -> str:
    ensure_tmp_dir()
    return str(TMP_DIR / filename)


def cleanup_file(file_path: str):
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception as e:
        print(f"Error cleaning up file {file_path}: {e}")

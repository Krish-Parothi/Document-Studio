from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import re
import unicodedata


def generate_pdf(content: str, style_params: dict, file_path: str) -> str:
    """Generate a PDF document from content with style parameters."""

    doc = SimpleDocTemplate(
        file_path,
        pagesize=letter,
        rightMargin=0.75*inch,
        leftMargin=0.75*inch,
        topMargin=0.75*inch,
        bottomMargin=0.75*inch,
        encoding='utf-8'
    )

    story = []
    styles = getSampleStyleSheet()

    font_family = style_params.get("font_family", "Helvetica")
    font_size = style_params.get("font_size", 12)
    text_color = style_params.get("text_color", "000000")
    line_spacing = style_params.get("line_spacing", 1.0)

    normal_style = ParagraphStyle(
        "CustomNormal",
        parent=styles["Normal"],
        fontName=_get_font_name(font_family),
        fontSize=font_size,
        textColor=_hex_to_rgb(text_color),
        alignment=TA_JUSTIFY,
        spaceAfter=12,
        leading=font_size * line_spacing,
    )

    heading1_style = ParagraphStyle(
        "CustomHeading1",
        parent=styles["Heading1"],
        fontName=_get_font_name(font_family),
        fontSize=font_size + 8,
        textColor=_hex_to_rgb(text_color),
        alignment=TA_CENTER,
        spaceAfter=12,
        spaceBefore=12,
        fontBold=True,
    )

    heading2_style = ParagraphStyle(
        "CustomHeading2",
        parent=styles["Heading2"],
        fontName=_get_font_name(font_family),
        fontSize=font_size + 4,
        textColor=_hex_to_rgb(text_color),
        alignment=TA_LEFT,
        spaceAfter=10,
        spaceBefore=10,
        fontBold=True,
    )

    # Clean and normalize content
    content = _normalize_unicode(content)
    content = _clean_content(content)
    sections = _parse_sections(content)

    for section in sections:
        if section["type"] == "title":
            story.append(Paragraph(_escape_special_chars(section["content"]), heading1_style))
            story.append(Spacer(1, 0.2*inch))
        elif section["type"] == "heading":
            story.append(Paragraph(_escape_special_chars(section["content"]), heading2_style))
            story.append(Spacer(1, 0.15*inch))
        elif section["type"] == "paragraph":
            if section["content"].strip():
                story.append(Paragraph(_escape_special_chars(section["content"]), normal_style))
                story.append(Spacer(1, 0.1*inch))
        elif section["type"] == "list_item":
            bullet_text = f"- {section['content']}"
            story.append(Paragraph(_escape_special_chars(bullet_text), normal_style))
            story.append(Spacer(1, 0.05*inch))
        elif section["type"] == "page_break":
            story.append(PageBreak())

    doc.build(story)
    return file_path


def _normalize_unicode(content: str) -> str:
    """Convert special Unicode characters to ASCII equivalents."""
    # Character mapping for special dashes and quotes
    replacements = {
        '—': '-',      # em-dash to hyphen
        '–': '-',      # en-dash to hyphen
        '‐': '-',      # hyphen to hyphen
        '‑': '-',      # non-breaking hyphen to hyphen
        '‒': '-',      # figure dash to hyphen
        '“': '"',      # left double quotation mark to quote
        '”': '"',      # right double quotation mark to quote
        '‘': "'",      # left single quotation mark to apostrophe
        '’': "'",      # right single quotation mark to apostrophe
        '•': '-',      # bullet to hyphen
        '‣': '-',      # triangular bullet to hyphen
        '…': '...',    # ellipsis to three dots
        ' ': ' ',      # non-breaking space to regular space
        '​': '',       # zero-width space to nothing
        '‌': '',       # zero-width non-joiner to nothing
        '‍': '',       # zero-width joiner to nothing
        '﻿': '',       # zero-width no-break space to nothing
    }

    for unicode_char, ascii_char in replacements.items():
        content = content.replace(unicode_char, ascii_char)

    # Use NFKD normalization to decompose remaining Unicode characters
    content = unicodedata.normalize('NFKD', content)
    content = content.encode('ascii', 'ignore').decode('ascii')

    return content


def _escape_special_chars(text: str) -> str:
    """Escape special characters for ReportLab."""
    # Replace any remaining problematic characters
    text = text.replace('&', '&amp;')
    text = text.replace('<', '&lt;')
    text = text.replace('>', '&gt;')
    text = text.replace('\n', '<br/>')
    return text


def _clean_content(content: str) -> str:
    """Clean markdown-style content for better PDF rendering."""
    # Remove markdown headers
    content = re.sub(r'^#+\s+', '', content, flags=re.MULTILINE)
    # Remove bold/italic markdown
    content = re.sub(r'\*\*([^*]+)\*\*', r'\1', content)
    content = re.sub(r'\*([^*]+)\*', r'\1', content)
    content = re.sub(r'__([^_]+)__', r'\1', content)
    content = re.sub(r'_([^_]+)_', r'\1', content)
    # Remove markdown code blocks
    content = re.sub(r'```[\s\S]*?```', '', content)
    # Remove inline code ticks
    content = re.sub(r'`([^`]+)`', r'\1', content)
    # Remove markdown links
    content = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', content)
    # Remove HTML comments
    content = re.sub(r'<!--[\s\S]*?-->', '', content)
    # Remove multiple spaces
    content = re.sub(r' +', ' ', content)
    # Remove excessive newlines
    content = re.sub(r'\n\n+', '\n\n', content)
    return content.strip()


def _parse_sections(content: str) -> list:
    """Parse content into structured sections."""
    sections = []
    lines = content.split('\n')

    is_first = True
    for line in lines:
        line = line.strip()
        if not line:
            continue

        # First non-empty line is title
        if is_first:
            sections.append({"type": "title", "content": line})
            is_first = False
            continue

        # Detect headings by common keywords
        if any(line.lower().startswith(h) for h in ["summary", "overview", "introduction", "background", "methodology", "results", "conclusion", "recommendations"]):
            sections.append({"type": "heading", "content": line})
        # Detect list items (now using standard hyphen)
        elif line.startswith(('-', '*')):
            sections.append({"type": "list_item", "content": line.lstrip('-* ')})
        # Regular paragraph
        else:
            sections.append({"type": "paragraph", "content": line})

    return sections


def _get_font_name(font_family: str) -> str:
    """Map font family names to reportlab font names."""
    # Use built-in fonts that support ASCII reliably
    font_map = {
        "Arial": "Helvetica",
        "Times": "Times-Roman",
        "Courier": "Courier",
        "Helvetica": "Helvetica",
    }
    return font_map.get(font_family, "Helvetica")


def _hex_to_rgb(hex_color: str):
    """Convert hex color to RGB tuple for reportlab."""
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i:i+2], 16) / 255.0 for i in (0, 2, 4))

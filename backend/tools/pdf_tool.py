from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
import re


def generate_pdf(content: str, style_params: dict, file_path: str) -> str:
    """Generate a PDF document from content with style parameters."""

    doc = SimpleDocTemplate(
        file_path,
        pagesize=letter,
        rightMargin=0.75*inch,
        leftMargin=0.75*inch,
        topMargin=0.75*inch,
        bottomMargin=0.75*inch
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

    title_style = ParagraphStyle(
        "CustomTitle",
        parent=styles["Heading1"],
        fontName=_get_font_name(font_family),
        fontSize=font_size + 6,
        textColor=_hex_to_rgb(text_color),
        alignment=TA_CENTER,
        spaceAfter=12,
    )

    paragraphs = content.split("\n\n")

    for i, paragraph in enumerate(paragraphs):
        if not paragraph.strip():
            continue

        if i == 0:
            story.append(Paragraph(paragraph.strip(), title_style))
        else:
            story.append(Paragraph(paragraph.strip(), normal_style))

        story.append(Spacer(1, 0.2*inch))

    doc.build(story)
    return file_path


def _get_font_name(font_family: str) -> str:
    """Map font family names to reportlab font names."""
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

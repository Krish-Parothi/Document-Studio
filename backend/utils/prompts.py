ROUTER_PROMPT = """Analyze the user's document generation request and determine what type of document they want to create.

The user request is: {user_prompt}

Respond with ONLY the document type in this exact format:
- If they want a report, analysis, invoice, or formal document: respond "pdf"
- If they want a letter, memo, proposal, or editable document: respond "docx"
- If they want a spreadsheet, table, data analysis, or calculation: respond "xlsx"

Respond with only one word: pdf, docx, or xlsx"""

PLANNER_PROMPT = """Create a detailed content plan for generating a {doc_type} document.

User request: {user_prompt}

Provide a structured outline of what should be included in the document. For {doc_type}:
- PDF: sections, content, formatting
- DOCX: structure, paragraphs, formatting
- XLSX: columns, data structure, calculations

Be specific and actionable."""

GENERATOR_PROMPT = """Generate the complete content for a {doc_type} document based on this plan.

User request: {user_prompt}
Content plan: {content_plan}

Generate the full content that will be formatted into the document.
For PDF/DOCX: provide formatted text with clear sections.
For XLSX: provide structured data with column headers."""

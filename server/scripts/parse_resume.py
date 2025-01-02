import pdfplumber
import json
from pathlib import Path
import sys

def parse_resume(pdf_path):
    try:
        # Check if the file exists
        pdf_file = Path(pdf_path)
        if not pdf_file.is_file():
            raise FileNotFoundError(f"The file {pdf_path} does not exist.")
        
        print(f"File {pdf_path} found. Starting extraction...")
        
        # Extract text using pdfplumber
        with pdfplumber.open(pdf_file) as pdf:
            text = ""
            for i, page in enumerate(pdf.pages):
                print(f"Extracting text from page {i + 1}...")
                text += page.extract_text() or ""  # Add empty string if page has no text

        if not text.strip():
            raise ValueError("No text found in the resume.")

        print(f"Text extracted successfully from {pdf_path}!")
        print(json.dumps({"success": True, "data": text}, indent=4))
        return text

    except FileNotFoundError as fnf_error:
        print(json.dumps({"success": False, "error": str(fnf_error)}))
    except ValueError as val_error:
        print(json.dumps({"success": False, "error": str(val_error)}))
    except Exception as e:
        print(json.dumps({"success": False, "error": f"Unexpected error: {e}"}))

if __name__ == "__main__":
    # Get the PDF path from command-line arguments or use a default
    pdf_path = sys.argv[1] if len(sys.argv) > 1 else "resume.pdf"
    parse_resume(pdf_path)
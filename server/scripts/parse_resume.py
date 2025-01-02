from pyresparser import ResumeParser
import spacy
from pathlib import Path

# Load spaCy model
nlp = spacy.load('en_core_web_sm')

# Function to parse the resume using pyresparser
def parse_resume(pdf_path):
    try:
        pdf_file = Path(pdf_path)
        if not pdf_file.is_file():
            raise FileNotFoundError(f"The file {pdf_path} does not exist.")
        
        parsed_data = ResumeParser(str(pdf_file), custom_nlp=nlp).get_extracted_data()
        
        if not parsed_data:
            raise ValueError("Failed to parse resume")
        
        return parsed_data
    except Exception as e:
        print(json.dumps({"success": False, "error": f"Error parsing resume: {e}"}))
        sys.exit(1)
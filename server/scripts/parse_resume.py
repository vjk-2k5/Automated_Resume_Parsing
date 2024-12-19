import re
import sys
import json
import PyPDF2
import spacy
from pathlib import Path

# Load the pre-trained SpaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except Exception as e:
    print(json.dumps({"success": False, "error": f"Error loading SpaCy model: {e}"}))
    sys.exit(1)

# Function to extract text from a PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        # Validate that the provided path is a file
        pdf_file = Path(pdf_path)
        if not pdf_file.is_file():
            raise FileNotFoundError(f"The file {pdf_path} does not exist.")

        with open(pdf_file, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
    except Exception as e:
        print(json.dumps({"success": False, "error": f"Error reading PDF: {e}"}))
        sys.exit(1)
    return text

# Function to parse the resume and extract details using SpaCy
def parse_resume(resume_text):
    extracted_data = {}
    doc = nlp(resume_text)

    # Extract name (using SpaCy's PERSON entity)
    name = None
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            name = ent.text
            break
    extracted_data['name'] = name if name else "Not Found"

    # Extract previous company (using keywords like 'Company', 'Worked at', or 'Employer')
    company_match = re.search(r"(?:Company|Worked at|Employer):?\s*([A-Za-z &]+)", resume_text)
    extracted_data['previousCompany'] = company_match.group(1).strip() if company_match else "Not Found"

    # Extract experience (Assuming phrases like 'X years of experience')
    experience_match = re.search(r"(\d+\.?\d*) years? of experience", resume_text)
    extracted_data['yearsOfExperience'] = float(experience_match.group(1)) if experience_match else 0.0

    # Extract skills (Assuming a section titled 'Skills' or similar)
    skills_match = re.search(r"Skills[:\n\r\-\s]*(.*?)(?:\n|\r|$)", resume_text, re.DOTALL)
    if skills_match:
        skills = skills_match.group(1).strip().replace("\n", ", ")
        extracted_data['skills'] = [skill.strip() for skill in skills.split(',')]
    else:
        extracted_data['skills'] = []

    # Extract designation (Assuming keywords like 'Designation' or 'Role')
    designation_match = re.search(r"(?:Designation|Role):?\s*([A-Za-z ]+)", resume_text)
    extracted_data['designation'] = designation_match.group(1).strip() if designation_match else "Not Found"

    return extracted_data

# Main script
def main():
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": "No file path provided."}))
        sys.exit(1)

    pdf_path = sys.argv[1]

    # Log the received path for debugging
    print(json.dumps({"success": True, "data": {"receivedPath": pdf_path}}))

    # Check if the file exists and log the result
    pdf_file = Path(pdf_path)
    if not pdf_file.is_file():
        print(json.dumps({"success": False, "error": f"The file {pdf_path} does not exist."}))
        sys.exit(1)

    resume_text = extract_text_from_pdf(pdf_path)

    if resume_text:
        extracted_details = parse_resume(resume_text)
        print(json.dumps({"success": True, "data": extracted_details}))
    else:
        print(json.dumps({"success": False, "error": "Failed to extract text from the PDF."}))
        sys.exit(1)

if __name__ == "__main__":
    main()
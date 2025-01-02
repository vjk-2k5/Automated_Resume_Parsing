import sys
import json
from pyresparser import ResumeParser
from pathlib import Path

# Function to parse the resume using pyresparser
def parse_resume(pdf_path):
    try:
        # Validate that the provided path is a file
        pdf_file = Path(pdf_path)
        if not pdf_file.is_file():
            raise FileNotFoundError(f"The file {pdf_path} does not exist.")

        # Parse the resume
        parsed_data = ResumeParser(str(pdf_file)).get_extracted_data()
        
        # Check if parsing was successful
        if not parsed_data:
            raise ValueError("Failed to parse resume")
        
        return parsed_data
    except Exception as e:
        print(json.dumps({"success": False, "error": f"Error parsing resume: {e}"}))
        sys.exit(1)

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

    parsed_details = parse_resume(pdf_path)

    # Output the parsed details
    if parsed_details:
        print(json.dumps({"success": True, "data": parsed_details}))
    else:
        print(json.dumps({"success": False, "error": "Failed to parse the resume."}))
        sys.exit(1)

if __name__ == "__main__":
    main()
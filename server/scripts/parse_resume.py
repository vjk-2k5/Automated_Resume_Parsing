import sys
import json
from pyresparser import ResumeParser

def parse_resume(file_path):
    try:
        data = ResumeParser(file_path).get_extracted_data()
        
        # Debug: Log the full extracted data
        print(json.dumps({"debug_data": data}), file=sys.stderr)
        
        if not data:
            return {"success": False, "error": "No data extracted from resume."}
        
        relevant_data = {
            "name": data.get("name", "N/A"),
            "skills": data.get("skills", []),
            "yearsOfExperience": float(data.get("total_experience", 0)),
            "designation": data.get("designation", "N/A"),
            "previousCompany": data.get("company_names", []),
        }
        return {"success": True, "data": relevant_data}
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        # No file path provided
        error_response = {"success": False, "error": "No file path provided."}
        print(json.dumps(error_response))
        sys.exit(1)
    
    file_path = sys.argv[1]
    parsed_data = parse_resume(file_path)
    print(json.dumps(parsed_data))
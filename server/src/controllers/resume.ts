import { Request, Response } from 'express';
import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ParsedDataModel, IParsedData } from '../models/parsedData';

// Define the path to the Python interpreter in the virtual environment
const pythonInterpreter = path.resolve(__dirname, '../../.venv/Scripts/python.exe'); // Adjust for Windows

export const uploadResume = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ensure a file is uploaded
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const filePath = path.resolve(__dirname, '../../uploads', req.file.filename);

    // Execute the Python script to parse the resume
    execFile(pythonInterpreter, ['scripts/parse_resume.py', filePath], async (error, stdout, stderr) => {
      // Delete the file after processing
      fs.unlinkSync(filePath);

      if (error) {
        console.error(`Error executing script: ${stderr}`);
        res.status(500).json({ message: 'Error processing file', error: stderr.trim() });
        return;
      }

      try {
        // Parse the JSON output from the Python script
        const parsedData = JSON.parse(stdout);

        if (!parsedData.success) {
          res.status(400).json({ message: parsedData.error, error: parsedData.error });
          return;
        }

        // Validate required fields based on the ParsedData model
        const requiredFields = ['name', 'skills', 'yearsOfExperience', 'designation', 'previousCompany'];
        const missingFields = requiredFields.filter(field => !(field in parsedData.data));

        if (missingFields.length > 0) {
          res.status(400).json({ message: `Missing fields in parsed data: ${missingFields.join(', ')}`, error: '' });
          return;
        }

        // Create a new ParsedData entry
        const parsedDataEntry: IParsedData = new ParsedDataModel({
          name: parsedData.data.name,
          skills: Array.isArray(parsedData.data.skills) ? parsedData.data.skills : [parsedData.data.skills],
          yearsOfExperience: parseFloat(parsedData.data.yearsOfExperience) || 0,
          designation: parsedData.data.designation,
          previousCompany: Array.isArray(parsedData.data.previousCompany)
            ? parsedData.data.previousCompany
            : [parsedData.data.previousCompany],
        });

        // Save to the database
        await parsedDataEntry.save();

        // Respond with the parsed data
        res.status(200).json({
          success: true,
          data: parsedDataEntry,
        });
      } catch (parseError) {
        console.error(`Error parsing JSON: ${parseError}`);
        res.status(500).json({ message: 'Error parsing resume data', error: parseError.toString() });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error while uploading resume', error: error.toString() });
  }
};

// Handler to retrieve all parsed resume data
export const getAllResumes = async (req: Request, res: Response): Promise<void> => {
  try {
    const resumes = await ParsedDataModel.find();
    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
    });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: 'Server error while fetching resumes', error: error.toString() });
  }
};
import { Schema, model, Document } from 'mongoose';

export interface IParsedData extends Document {
  name: string;
  skills: string[];
  yearsOfExperience: number;
  designation: string;
  previousCompany: string[];
}

const ParsedDataSchema = new Schema<IParsedData>({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  yearsOfExperience: { type: Number, required: true },
  designation: { type: String, required: true },
  previousCompany: { type: [String], required: true },
});

export const ParsedDataModel = model<IParsedData>('ParsedData', ParsedDataSchema);
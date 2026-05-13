import { model, Schema } from "mongoose";

export interface ICandidate {
    role: string;
    description: string;
    skills: string[];
    imageName: string;
}

const candidateSchema = new Schema<ICandidate>(
    {
        role: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        skills: {
            type: [String],
            required: true,
            default: []
        },
        imageName: String
    },
    {
        timestamps: true
    }
);

const Candidate = model<ICandidate>("Candidate", candidateSchema);

export default Candidate;
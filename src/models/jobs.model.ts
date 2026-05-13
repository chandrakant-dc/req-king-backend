import { model, Schema } from "mongoose";

export interface IJob {
    name: string;
    location: string;
    skills: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const jobSchema = new Schema<IJob>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        skills: {
            type: [String],
            required: true,
            default: [],
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

const Job = model<IJob>("Job", jobSchema);

export default Job;
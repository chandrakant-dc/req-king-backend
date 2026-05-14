import { model, Schema } from "mongoose";

export interface IJobInquiry {
    name: string;
    email: string;
    whatsAppNumber: string;
    companyName: string;
    jobTitle: string;
    expectedSalary: string;
    currentLocation: string;
    interestedJobTitle: string;
    workExperienceInBrief: string;
    cv: string;
    status: "pending" | "done";
}

const jobInquirySchema = new Schema<IJobInquiry>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        whatsAppNumber: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        jobTitle: {
            type: String,
            required: true
        },
        expectedSalary: {
            type: String,
            required: true
        },
        currentLocation: {
            type: String,
            required: true
        },
        interestedJobTitle: {
            type: String,
            required: true
        },
        workExperienceInBrief: {
            type: String,
            required: true
        },
        cv: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "done"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
)

const JobInquiry = model<IJobInquiry>("JobInquiry", jobInquirySchema);

export default JobInquiry;
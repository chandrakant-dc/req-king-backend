import { model, Schema } from "mongoose";

export interface IInquiry {
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    message: string;
    status: "pending" | "done";
}

const generalInquirySchema = new Schema<IInquiry>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        message: String,
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

const GeneralInquiry = model<IInquiry>("GeneralInquiry", generalInquirySchema);

export default GeneralInquiry;
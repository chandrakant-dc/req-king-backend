import { model, Schema } from "mongoose";

export interface IBusinessInquiry {
    name: string;
    contactNumber: string;
    email: string;
    companyName: string;
    service: string;
    status: "pending" | "done";
}

const businessInquirySchema = new Schema<IBusinessInquiry>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        service: {
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

const BusinessInquiry = model<IBusinessInquiry>("BusinessInquiry", businessInquirySchema);

export default BusinessInquiry;
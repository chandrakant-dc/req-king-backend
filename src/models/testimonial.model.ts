import { model, Schema } from "mongoose";

export interface ITestimonials {
    name: string;
    role: string;
    description: string;
}

const testimonialSchema = new Schema<ITestimonials>(
    {
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Testimonial = model<ITestimonials>("Testimonial", testimonialSchema);

export default Testimonial;
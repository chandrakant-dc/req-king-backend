import type { Request, Response } from "express";
import Testimonial from "../models/testimonial.model.js";

export const getAllTestimonial = async (req: Request, res: Response) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            message: "Testimonial fetched successfully",
            data: testimonials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch testimonials",
            error
        })
    }
}

export const createTestimonial = async (req: Request, res: Response) => {
    try {
        const { name, role, description } = req.body;

        if (!name) {
            res.status(404).json({
                success: false,
                message: "name is required"
            });
            return;
        }

        if (!role) {
            res.status(404).json({
                success: false,
                message: "role is required"
            });
            return;
        }

        if (!description) {
            res.status(404).json({
                success: false,
                message: "description is required"
            });
            return;
        }

        const newTestimonial = await Testimonial.create({
            name,
            role,
            description
        });

        res.status(201).json({
            success: true,
            message: "Testimonial created successfully",
            data: newTestimonial
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create testimonial",
            error
        })
    }
}


export const updateTestimonial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, role, description } = req.body;

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id,
            {
                name,
                role,
                description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updateTestimonial) {
            res.status(404).json({
                success: false,
                message: "testimonial not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "testimonial updated successfully",
            data: updatedTestimonial
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update testimonials",
            error
        })
    }
}

export const deleteTestimonial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            res.status(404).json({
                success: false,
                message: "Testimonial not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Testimonial deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete testimonial",
            error
        })
    }
}
import type { Request, Response } from "express";
import Candidate from "../models/candidate.model.js";

export const getAllCandidates = async (req: Request, res: Response) => {
    try {
        const candidate = await Candidate.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            message: "Candidate fetched successfully",
            data: candidate
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch candidates",
            error
        })
    }
}


export const createCandidate = async (req: Request, res: Response) => {
    try {
        const { role, description, skills, imageName } = req.body;

        if (!role) {
            res.status(400).json({
                success: false,
                message: "role is required"
            });
            return;
        }

        if (!description) {
            res.status(400).json({
                success: false,
                message: "description is required"
            });
            return;
        }

        if (!skills || skills.length === 0) {
            res.status(400).json({
                success: false,
                message: "skills is required"
            });
            return;
        }

        if (!imageName) {
            res.status(400).json({
                success: false,
                message: "image name is required"
            })
        }

        const newCandidate = await Candidate.create({
            role,
            description,
            skills,
            imageName
        });

        res.status(201).json({
            success: true,
            message: "candidate created successfully",
            data: newCandidate
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create candidate"
        })
    }
}

export const updateCandidate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { role, description, skills, imageName } = req.body;

        const updateCandidate = await Candidate.findByIdAndUpdate(
            id,
            {
                role,
                description,
                skills,
                imageName
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updateCandidate) {
            res.status(404).json({
                success: false,
                message: "candidate not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "candidate updated successfully",
            data: updateCandidate
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update candidate"
        })
    }
}

export const deleteCandidate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCandidate = await Candidate.findByIdAndDelete(id);

        if (!deletedCandidate) {
            res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Candidate delete successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete candidate"
        })
    }
}
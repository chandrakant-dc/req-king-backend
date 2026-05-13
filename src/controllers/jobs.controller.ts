import type { Request, Response } from "express";
import Job from "../models/jobs.model.js";
// import Job from "../models/job.model";

// GET ALL JOBS
export const getAllJobs = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: jobs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch jobs",
            error,
        });
    }
};

// CREATE JOB
export const createJob = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, location, skills } = req.body;

        if (!name || !location) {
            res.status(400).json({
                success: false,
                message: "Name and location are required",
            });
            return;
        }

        const newJob = await Job.create({
            name,
            location,
            skills,
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: newJob,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create job",
            error,
        });
    }
};

// UPDATE JOB
export const updateJob = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, location, skills } = req.body;

        const updatedJob = await Job.findByIdAndUpdate(
            id,
            {
                name,
                location,
                skills,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedJob) {
            res.status(404).json({
                success: false,
                message: "Job not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            data: updatedJob,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update job",
            error,
        });
    }
};

// DELETE JOB
export const deleteJob = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            res.status(404).json({
                success: false,
                message: "Job not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete job",
            error,
        });
    }
};
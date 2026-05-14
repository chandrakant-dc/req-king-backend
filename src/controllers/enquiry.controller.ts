import type { Request, Response } from "express";
import { uploadToCloudinary } from "../config/uploadToCloudinary.js";
import BusinessInquiry from "../models/business-inquiry.model.js";
import GeneralInquiry from "../models/general-inquiry.model.js";
import JobInquiry from "../models/job-inquiry.model.js";

export const createGeneralInquiry = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            phoneNumber,
            companyName,
            message
        } = req.body;

        if (!name) {
            res.status(404).json({
                success: false,
                message: "Name is required"
            });
            return;
        }

        if (!email) {
            res.status(404).json({
                success: false,
                message: "Email is required"
            });
            return;
        }

        if (!phoneNumber) {
            res.status(404).json({
                success: false,
                message: "phone number is required"
            });
            return;
        }

        if (!companyName) {
            res.status(404).json({
                success: false,
                message: "company name is required"
            });
            return;
        }

        if (!message) {
            res.status(404).json({
                success: false,
                message: "message is required"
            });
            return;
        }

        const newInquiry = await GeneralInquiry.create({
            name,
            email,
            phoneNumber,
            companyName,
            message
        })

        res.status(201).json({
            success: true,
            message: "General Inquiry created successfully",
            data: newInquiry
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create general inquiry",
            error
        })
    }
}

export const getAllGeneralInquiry = async (req: Request, res: Response) => {
    try {
        const allInquires = await GeneralInquiry.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            message: "General Inquires fetched successfully",
            data: allInquires
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch general inquires",
            error
        })
    }
}

export const markedDoneGeneralInquiry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedGeneralInquiry = await GeneralInquiry.findByIdAndUpdate(
            id,
            {
                status: "done"
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedGeneralInquiry) {
            res.status(404).json({
                success: false,
                message: "general inquiry not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "status updated successfully",
            data: updatedGeneralInquiry
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update status",
            error
        })
    }
}

export const createJobInquiry = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            whatsAppNumber,
            companyName,
            jobTitle,
            expectedSalary,
            currentLocation,
            interestedJobTitle,
            workExperienceInBrief
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "CV required" });
        }

        if (!name) {
            return res.status(400).json({
                message: "name is required"
            })
        }

        if (!email) {
            return res.status(400).json({
                message: "email is required"
            })
        }

        if (!whatsAppNumber) {
            return res.status(400).json({
                message: "whatsApp Number is required"
            })
        }

        if (!companyName) {
            return res.status(400).json({
                message: "company name is required"
            })
        }
        if (!jobTitle) {
            return res.status(400).json({
                message: "job title is required"
            })
        }

        if (!expectedSalary) {
            return res.status(400).json({
                message: "expected salary is required"
            })
        }

        if (!currentLocation) {
            return res.status(400).json({
                message: "current location is required"
            })
        }

        if (!interestedJobTitle) {
            return res.status(400).json({
                message: "interested job title is required"
            })
        }

        if (!workExperienceInBrief) {
            return res.status(400).json({
                message: "work experience title is required"
            })
        }

        const result: any = await uploadToCloudinary(
            req.file.buffer,
            "cv"
        );

        const cate = new JobInquiry({
            name,
            email,
            whatsAppNumber,
            companyName,
            jobTitle,
            expectedSalary,
            currentLocation,
            interestedJobTitle,
            workExperienceInBrief,
            cv: result.secure_url
        });
        await cate.save();
        return res.status(201).json({
            status: true,
            message: "job inquiry created successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create job inquiry",
            error
        })
    }
}

export const getAllJobInquiry = async (req: Request, res: Response) => {
    try {
        const allInquires = await JobInquiry.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            message: "Job Inquires fetched successfully",
            data: allInquires
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch job inquires",
            error
        })
    }
}

export const markedDoneJobInquiry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedJobInquiry = await JobInquiry.findByIdAndUpdate(
            id,
            {
                status: "done"
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedJobInquiry) {
            res.status(404).json({
                success: false,
                message: "job inquiry not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "status updated successfully",
            data: updatedJobInquiry
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update status",
            error
        })
    }
}

export const createBusinessInquiry = async (req: Request, res: Response) => {
    try {
        const {
            name,
            contactNumber,
            email,
            companyName,
            service,
        } = req.body;


        if (!name) {
            return res.status(400).json({
                message: "name is required"
            })
        }

        if (!email) {
            return res.status(400).json({
                message: "email is required"
            })
        }

        if (!contactNumber) {
            return res.status(400).json({
                message: "contact number is required"
            })
        }

        if (!companyName) {
            return res.status(400).json({
                message: "company name is required"
            })
        }

        if (!service) {
            return res.status(400).json({
                message: "service name is required"
            })
        }

        const newBusinessInquiry = await BusinessInquiry.create({
            name,
            contactNumber,
            email,
            companyName,
            service
        });

        res.status(201).json({
            success: true,
            message: "Business inquiry created successfully",
            data: newBusinessInquiry
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create business inquiry",
            error
        })
    }
}

export const getAllBusinessInquiry = async (req: Request, res: Response) => {
    try {
        const allInquires = await BusinessInquiry.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            message: "Business Inquires fetched successfully",
            data: allInquires
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch business inquires",
            error
        })
    }
}

export const markedDoneBusinessInquiry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedBusinessInquiry = await BusinessInquiry.findByIdAndUpdate(
            id,
            {
                status: "done"
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBusinessInquiry) {
            res.status(404).json({
                success: false,
                message: "business inquiry not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "status updated successfully",
            data: updatedBusinessInquiry
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update status",
            error
        })
    }
}
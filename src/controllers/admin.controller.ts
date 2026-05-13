import bcrypt from 'bcrypt';
import type { Request, Response } from "express";
import Admin from '../models/admin.model.js';
import { loginAdminModel, registerAdminModel, verifyAdminOtpModel } from "../services/admin.service.js";
import { sendOtpEmail } from '../services/email.service.js';
import { generateOtp } from '../utils/generateOtp.js';

interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export const registerAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            res.status(400).json({
                message: "email is required"
            })
            return;
        }
        if (!password) {
            res.status(400).json({
                message: "password is required"
            })
            return;
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // const { encryptedSecret, qrCode } = await generate2FA(email);

        const adminInfo = {
            email,
            password: hashedPassword,
            // twoFactorSecret: encryptedSecret,
            // twoFactorEnabled: true,
        }
        const isAdminExist = await registerAdminModel(adminInfo);

        if (isAdminExist === true) {
            res.status(400).json({
                message: "admin already exist"
            })
            return;
        }

        res.status(201).json({
            message: "admin registered successfully!",
            // qrCode
        })
    } catch (error) {
        res.status(400).json({
            message: "something went wrong",
            error: error
        })
    }
}

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        await loginAdminModel(req, res);
        return res.json({ message: "OTP sent to email" });
    } catch (error) {
        res.status(400).json({
            message: "something went wrong",
            error: error
        })
    }
}

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        await verifyAdminOtpModel(req, res);
    } catch (error) {
        res.status(400).json({
            message: "something went wrong",
            error: error
        })
    }
};

// export const verifyAdmin2FA = async (req: Request, res: Response) => {
//     try {
//         await verifyAdmin2FAService(req, res);
//     } catch (error) {
//         res.status(400).json({
//             message: "something went wrong",
//             error: error
//         })
//     }
// };

export const logoutAdmin = (req: Request, res: Response) => {
    res.clearCookie("rqaid", {
        httpOnly: true,
        secure: true, // true in production (HTTPS)
        sameSite: "none",
    });
    res.json({ status: true, message: "admin logged out" });
};

export const checkToken = (req: Request, res: Response) => {
    res.status(200).json({ status: true });
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const otp = generateOtp();

        const hashedOtp = await bcrypt.hash(otp, 10);
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min

        await Admin.updateOne(
            { email },
            {
                otp: hashedOtp,
                otpExpires,
            }
        );

        await sendOtpEmail(email, otp);
        res.status(200).json({
            message: "otp sent to mail"
        })
    } catch (error) {
        res.status(400).json({
            message: "something went wrong",
            error: error
        })
    }
}

export const resetPassword = async (req: AuthRequest, res: Response) => {
    try {
        const { newPassword } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await Admin.findByIdAndUpdate(userId, { password: hashedPassword });
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
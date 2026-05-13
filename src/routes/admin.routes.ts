import { Router } from "express";
import { checkToken, forgotPassword, loginAdmin, logoutAdmin, registerAdmin, resetPassword, verifyOtp } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createAdminSchema } from "../schemas/admin.schema.js";

const router = Router();

router.post("/register", validate(createAdminSchema), registerAdmin);
router.post("/login", validate(createAdminSchema), loginAdmin);
router.post("/verify-otp", verifyOtp);
// router.post("/verify-2fa", verifyAdmin2FA);
router.post("/logout", authMiddleware, logoutAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", authMiddleware, resetPassword);
router.get("/check-token", authMiddleware, checkToken);

export default router;
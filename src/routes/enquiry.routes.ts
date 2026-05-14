import { Router } from "express";
import { uploadCVImage } from "../config/uploadCVImage.js";
import { createBusinessInquiry, createGeneralInquiry, createJobInquiry, getAllBusinessInquiry, getAllGeneralInquiry, getAllJobInquiry, markedDoneBusinessInquiry, markedDoneGeneralInquiry, markedDoneJobInquiry } from "../controllers/enquiry.controller.js";
import { authMiddleware } from "../middleware/auth.js";


const router = Router();

router.post("/general", createGeneralInquiry);
router.get("/general/all", authMiddleware, getAllGeneralInquiry);
router.patch("/general/:id", authMiddleware, markedDoneGeneralInquiry);
router.post("/job", uploadCVImage.single("cv"), createJobInquiry);
router.get("/job/all", authMiddleware, getAllJobInquiry);
router.patch("/job/:id", authMiddleware, markedDoneJobInquiry);
router.post("/business", createBusinessInquiry);
router.get("/business/all", authMiddleware, getAllBusinessInquiry);
router.patch("/business/:id", authMiddleware, markedDoneBusinessInquiry)

export default router;
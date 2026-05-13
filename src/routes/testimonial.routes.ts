import { Router } from "express";
import { createTestimonial, deleteTestimonial, getAllTestimonial, updateTestimonial } from "../controllers/testimonial.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/all", getAllTestimonial);
router.post("/create", authMiddleware, createTestimonial);
router.patch("/update/:id", authMiddleware, updateTestimonial);
router.delete("/delete/:id", authMiddleware, deleteTestimonial);

export default router;
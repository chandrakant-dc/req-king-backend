import { Router } from "express";
import {
    createJob,
    deleteJob,
    getAllJobs,
    updateJob,
} from "../controllers/jobs.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/all", getAllJobs);
router.post("/create", authMiddleware, createJob);
router.patch("/update/:id", authMiddleware, updateJob);
router.delete("/delete/:id", authMiddleware, deleteJob);

export default router;
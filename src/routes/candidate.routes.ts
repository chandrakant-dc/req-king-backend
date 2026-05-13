import { Router } from "express";
import { createCandidate, deleteCandidate, getAllCandidates, updateCandidate } from "../controllers/candidate.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/all", getAllCandidates);
router.post("/create", authMiddleware, createCandidate);
router.patch("/update/:id", authMiddleware, updateCandidate);
router.delete("/delete/:id", authMiddleware, deleteCandidate);

export default router;
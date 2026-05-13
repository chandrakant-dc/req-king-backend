import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import "./env-config.js";

import { fileURLToPath } from "url";
import adminRoutes from "./routes/admin.routes.js";
import candidateRoutes from "./routes/candidate.routes.js";
import jobRoutes from "./routes/jobs.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/candidate", candidateRoutes);
app.use("/api/v1/testimonial", testimonialRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
export default app;
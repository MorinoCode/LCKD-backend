import express from "express";
import dotenv from "dotenv";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());


app.use(express.json());
app.use(logger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/passwords", passwordRoutes);
app.use("/api/users", userRoutes);


// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

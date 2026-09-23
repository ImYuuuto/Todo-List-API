import express from "express";
import authController from "../controllers/authController.js";

const app = express();
const router = express.Router();

router.post("/register", authController.registerUser)


export default router;










import express from "express";
const app = express();
const PORT = 3001;
import authRouter from "./routes/authRoutes.js"

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
})

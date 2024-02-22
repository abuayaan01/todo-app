import express from "express";
import cookieParser from "cookie-parser";
import { connectDb } from "./data/database.js";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import { errormiddleware } from "./middlewares/error.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

config({
  path: "./data/config.env",
});

connectDb();

app.use("/user", userRouter);
app.use("/task",taskRouter);

app.get("/", (req, res) => {
  return res.status(200).send("Api connected.");
});

app.listen(process.env.PORT, () => {
  console.log("Server is connected on port 3000.");
});

app.use(errormiddleware);

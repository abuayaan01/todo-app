import express from "express";
import { createTask, deleteTask, getTaskList, updateTask } from "../controllers/task/task.js";
import { isAuthenticated } from "../middlewares/Auth/Auth.js";

const router = express.Router();

router.get("/createTask", isAuthenticated, createTask);

router.get("/getMyTask", isAuthenticated, getTaskList);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;

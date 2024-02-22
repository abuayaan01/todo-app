import ErrorHandler from "../../middlewares/error.js";
import Task from "../../models/task/task.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = new Task({
    title,
    description,
    user: req.user,
  });

  try {
    const newTask = await task.save();
    res.status(201).json({
      success: true,
      msg: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in creating task.");
  }
};

export const getTaskList = async (req, res) => {
  try {
    const taskList = await Task.find({ user: req.user });
    res.status(200).json({
      success: true,
      data: taskList,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      msg: error,
      data: [],
    });
    console.log(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const updatedReq = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return next(new ErrorHandler("Task not found.",404))
    }


    for (const key in updatedReq) {
      if (Object.hasOwnProperty.call(updatedReq, key)) {
        task[key] = updatedReq[key];
      }
    }

    const updatedTask = await task.save();

    return res.status(200).json({
      data: updatedTask,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const deleteTask = async (req,res,next) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if(!task){
      return next(new ErrorHandler("Task not found",404))
    }

    await task.deleteOne();

    return res.status(204).json({
      success: true,
      msg: "Task deleted"
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

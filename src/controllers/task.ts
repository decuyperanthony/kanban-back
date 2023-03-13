import { TaskModel, ITask } from "../models/task";
import { ListModel } from "../models/list";

import { Request, Response } from "express";

const taskController = {
  getAllTasks: async (_req: Request, res: Response) => {
    try {
      const tasks: ITask[] = await TaskModel.find().exec();

      return res.status(200).send({ ok: true, data: tasks });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  addTask: async (req: Request, res: Response) => {
    try {
      const task: ITask = req.body;
      const { listId } = req.params;

      const taskExist = await TaskModel.findOne({
        name: task.name,
      }).exec();
      if (taskExist) {
        return res.status(409).send({
          ok: false,
          error: "There is already another task with this name",
        });
      }
      const newTask = await TaskModel.create(task);

      const list = await ListModel.findById(listId);
      if (!list) {
        return res.status(409).send({
          ok: false,
          error: "The list don't exist",
        });
      }
      await newTask.save();

      list.tasks.push(newTask);
      await list.save();

      return res.status(201).send({ ok: true, data: newTask });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  updateTask: async (req: Request, res: Response) => {
    try {
      const taskId = req.params._id;
      const task: ITask = req.body;

      const taskExist = await TaskModel.findById(taskId);
      if (!taskExist) {
        return res.status(409).send({
          ok: false,
          error: "This task doesn't exist",
        });
      }
      const updatedTask = {
        name: taskExist.name,
        status: taskExist.status,
        done: taskExist.done,
        isPrioritized: taskExist.isPrioritized,
      };
      if (req.body.hasOwnProperty("name")) updatedTask.name = task.name;
      if (req.body.hasOwnProperty("status")) updatedTask.status = task.status;
      if (req.body.hasOwnProperty("done")) updatedTask.done = task.done;
      if (req.body.hasOwnProperty("isPrioritized"))
        updatedTask.isPrioritized = task.isPrioritized;

      taskExist.set(updatedTask);

      await taskExist.save();

      return res.status(200).send({ ok: true, data: taskExist });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  deleteTask: async (req: Request, res: Response) => {
    try {
      const taskId = req.params._id;

      const taskExist = await TaskModel.findById(taskId);
      if (!taskExist) {
        return res.status(409).send({
          ok: false,
          error: "This task doesn't exist",
        });
      }
      await TaskModel.findByIdAndDelete(taskId);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },
};

export default taskController;

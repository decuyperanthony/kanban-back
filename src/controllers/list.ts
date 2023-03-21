import { ListModel, IList } from "../models/list";

import { Request, Response } from "express";
import { ITask, TaskModel } from "../models/task";

// Fonction pour mettre à jour les tâches
// async function updateTasks(tasks: Task[], collection: Collection<Task>): Promise<void> {
//   // Parcourir toutes les tâches et les mettre à jour dans la collection
//   const updatePromises: Promise<UpdateResult>[] = tasks.map((task: Task) => {
//     return collection.updateOne(
//       { id: task.id },
//       { $set: { name: task.name, orderIndex: task.orderIndex } }
//     );
//   });

const listController = {
  getAllLists: async (_req: Request, res: Response) => {
    try {
      const lists: IList[] = await ListModel.find(
        {},
        { _id: 1, title: 1 }
      ).exec();

      return res.status(200).send({ ok: true, data: lists });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  getTasksByListId: async (req: Request, res: Response) => {
    try {
      const listId = req.params._id;
      const list = await ListModel.findById(listId).populate("tasks").exec();
      if (!list) {
        return res.status(409).send({
          ok: false,
          error: "This list doesn't exist",
        });
      }

      return res
        .status(200)
        .send({
          ok: true,
          data: list.tasks.sort((a, b) => a.orderIndex - b.orderIndex),
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  addList: async (req: Request, res: Response) => {
    try {
      const list: IList = req.body;

      const newList = await ListModel.create(list);
      return res.status(201).send({ ok: true, data: newList });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  updateList: async (req: Request, res: Response) => {
    try {
      const listId = req.params._id;
      const list: IList = req.body;
      const listExist = await ListModel.findById(listId);
      if (!listExist) {
        return res.status(409).send({
          ok: false,
          error: "This list doesn't exist",
        });
      }
      const updatedList = {
        title: listExist.title,
      };
      if (req.body.hasOwnProperty("title")) updatedList.title = list.title;

      listExist.set(updatedList);

      await listExist.save();

      return res.status(200).send({ ok: true, data: listExist });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  updateAllTasksFromList: async (req: Request, res: Response) => {
    try {
      const listId = req.params._id;
      const updatedFields: IList = req.body;
      const listWithTasks = await ListModel.findById(listId)
        .populate("tasks")
        .exec();

      if (!listWithTasks) {
        return res.status(409).send({
          ok: false,
          error: "This list doesn't exist",
        });
      }
      const taskIds = listWithTasks.tasks.map(({ _id }) => _id);

      // Map the taskIds array and update each task
      const updatePromises = taskIds.map(async (taskId) => {
        const result = await TaskModel.updateOne(
          { _id: taskId },
          { $set: updatedFields }
        );
        return result;
      });

      const results = await Promise.all(updatePromises);

      // Log the number of successfully updated tasks
      const updatedCount = results.reduce(
        (count, result) => count + result.modifiedCount,
        0
      );

      const resText = `Successfully updated ${updatedCount} tasks, pass all fields name ${Object.keys(
        updatedFields
      )} to ${Object.values(updatedFields)}`;

      return res.status(200).send({
        ok: true,
        data: resText,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  updateOrderIndexTasksFromList: async (req: Request, res: Response) => {
    try {
      const tasks: ITask[] = req.body;

      const updatePromises = tasks.map(async (task) => {
        const result = await TaskModel.updateOne(
          { _id: task._id },
          { $set: { orderIndex: task.orderIndex } }
        );
        return result;
      });

      const updateResults = await Promise.all(updatePromises);

      // Vérifier que toutes les mises à jour ont réussi
      updateResults.forEach((result, index) => {
        if (result.modifiedCount !== 1) {
          throw new Error(
            `La tâche ${tasks[index]._id} n'a pas pu être mise à jour.`
          );
        }
      });

      // Log the number of successfully updated tasks
      const updatedCount = updateResults.reduce(
        (count, result) => count + result.modifiedCount,
        0
      );

      const resText = `Successfully updated ${updatedCount} task's orderIndex from list`;
      return res.status(200).send({
        ok: true,
        data: resText,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  deleteList: async (req: Request, res: Response) => {
    try {
      const listId = req.params._id;

      const listExist = await ListModel.findById(listId);
      if (!listExist) {
        return res.status(409).send({
          ok: false,
          error: "This list doesn't exist",
        });
      }
      if (listExist.tasks.length)
        listExist.tasks.forEach((task) => {
          TaskModel.findByIdAndDelete(task._id);
        });
      await ListModel.findByIdAndDelete(listId);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },
};

export default listController;

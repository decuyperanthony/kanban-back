import { ListModel, IList } from "../models/list";

import { Request, Response } from "express";

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

      return res.status(200).send({ ok: true, data: list.tasks });
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
      await ListModel.findByIdAndDelete(listId);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },
};

export default listController;

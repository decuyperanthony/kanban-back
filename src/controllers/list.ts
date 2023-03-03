import { ListModel, IList } from "../models/list";

import { Request, Response } from "express";

const listController = {
  getAllLists: async (_req: Request, res: Response) => {
    try {
      const lists: IList[] = await ListModel.find().populate("tasks").exec();

      return res.status(200).send({ ok: true, data: lists });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  addList: async (req: Request, res: Response) => {
    try {
      const list: IList = req.body;
      console.log("list", list);
      const newList = await ListModel.create(list);
      return res.status(201).send({ ok: true, data: newList });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  //   tasksByList : async (req: Request, res: Response) => {
  //     const { _id } = req.params;
  //     const list = await User.findById(_id).populate('posts');

  //      res.send(user.posts);
  //  }
};

export default listController;

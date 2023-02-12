import { KanbanModel, IKanban } from "../models/kanban";

import { Request, Response } from "express";

const kanbanController = {
  getAllKanbans: async (_req: Request, res: Response) => {
    try {
      const kanbans: IKanban[] = await KanbanModel.find().exec();

      return res.status(200).send({ ok: true, data: kanbans });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  addKanban: async (req: Request, res: Response) => {
    try {
      const kanban: IKanban = req.body;
      const kanbanExists = await KanbanModel.findOne({
        name: kanban.name,
      }).exec();
      if (kanbanExists) {
        return res.status(409).send({
          ok: false,
          error: "There is already another kanban with this name",
        });
      }
      const newKanban = await KanbanModel.create(kanban);
      return res.status(201).send({ ok: true, data: newKanban });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },
};

export default kanbanController;

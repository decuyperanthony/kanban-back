import { Router } from "express";
import kanbanController from "../controllers/kanban";
import { KanbanModel, IKanban } from "../models/kanban";

const routes = Router();

routes.get("/", kanbanController.getAllKanbans);
routes.post("/", kanbanController.addKanban);

export default routes;

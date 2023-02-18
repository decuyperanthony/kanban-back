import { Router } from "express";
import kanbanController from "../controllers/kanban";

const routes = Router();

routes.get("/", kanbanController.getAllKanbans);
routes.post("/", kanbanController.addKanban);
routes.delete("/:_id", kanbanController.deleteKanban);

export default routes;

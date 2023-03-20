import { Router } from "express";
import listController from "../controllers/list";

const routes = Router();

routes.get("/", listController.getAllLists);
routes.get("/:_id/task", listController.getTasksByListId);
routes.post("/", listController.addList);
routes.put("/:_id", listController.updateList);
routes.put("/tasks/all/:_id", listController.updateAllTasksFromList);
routes.put("/tasks/orderIndex", listController.updateOrderIndexTasksFromList);
routes.delete("/:_id", listController.deleteList);

export default routes;

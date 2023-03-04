import { Router } from "express";
import listController from "../controllers/list";

const routes = Router();

routes.get("/", listController.getAllLists);
routes.get("/:_id/task", listController.getTasksByListId);
routes.post("/", listController.addList);
routes.put("/:_id", listController.updateList);
routes.delete("/:_id", listController.deleteList);

export default routes;

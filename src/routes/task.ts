import { Router } from "express";
import taskController from "../controllers/task";

const routes = Router();

routes.get("/", taskController.getAllTasks);
routes.post("/list/:listId", taskController.addTask);
routes.put("/:_id", taskController.updateTask);
routes.delete("/:_id", taskController.deleteTask);

export default routes;

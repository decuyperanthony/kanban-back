import { Router } from "express";
import listController from "../controllers/list";

const routes = Router();

routes.get("/", listController.getAllLists);
routes.post("/", listController.addList);
routes.put("/", listController.updateList);
routes.delete("/", listController.deleteList);

export default routes;

import { Router } from "express";
import listController from "../controllers/list";

const routes = Router();

routes.get("/", listController.getAllLists);
routes.post("/", listController.addList);

export default routes;

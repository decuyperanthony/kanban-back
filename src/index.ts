import * as dotenv from "dotenv";
dotenv.config();
import "./lib/db";
import express from "express";
import cors from "cors";

import { taskRoutes, listRoutes } from "./routes";
import { CORS_ORIGIN_ALLOWED } from "./utils/config";

const app = express();
const port = process.env.PORT || 3333;

app.use(
  cors({
    credentials: true,
    origin: CORS_ORIGIN_ALLOWED,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

app.get("/", async (_req, res) => {
  res.json({ message: "Please visit /countries to view all the countries" });
});

app.use("/task", taskRoutes);
app.use("/list", listRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

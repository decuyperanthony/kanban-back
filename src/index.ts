import * as dotenv from "dotenv";
dotenv.config();
import "./lib/db";
import express from "express";
import cors from "cors";

import { kanbanRoutes, listRoutes } from "./routes";
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

app.use("/kanban", kanbanRoutes);
app.use("/list", listRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// // on ajoute un virtual pour associer les auteurs aux livres
// // pour avoir la liste des auteurs et les livres de chacun
// // nous nommons comme nous voulons "livres" line 15
// authorSchema.virtual("livres", {
//     // la ref de la collection
//     ref: "Livre",
//     // le localfield => champ présent dans la collecion
//     // permettant de faire le lien
//     localField: "_id",
//     // le champ souhaité
//     // foreign field qui sera dans notre liste le champ auteur
//     // donc on ajoutera le champ auteur au livre
//     foreignField: "auteur"
// })

// const authorModel = mongoose.model("Auteur", authorSchema);

// module.exports = authorModel;

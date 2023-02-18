import { model, Schema, Document } from "mongoose";

interface IKanban extends Document {
  name: string;
  status: "OPEN" | "DONE";
}

const KanbanSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  status: { type: String, default: "OPEN", enum: ["OPEN", "DONE"] },
  // lists: [{ type: Schema.Types.ObjectId, ref: "kanban_id" }],
});

// KanbanSchema.virtual("lists", {
//   // la ref de la collection
//   ref: "List",
//   // le localfield => champ présent dans la collecion
//   // permettant de faire le lien
//   localField: "_id",
//   // le champ souhaité
//   // foreign field qui sera dans notre liste le champ auteur
//   // donc on ajoutera le champ auteur au livre
//   foreignField: "kanban_id",
// });

const KanbanModel = model<IKanban>("Kanban", KanbanSchema);

export { KanbanModel, IKanban };

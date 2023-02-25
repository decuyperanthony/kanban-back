import { model, Schema, Document } from "mongoose";

interface ITask extends Document {
  name: string;
  status: "OPEN" | "DONE";
}

const TaskSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  status: { type: String, default: "OPEN", enum: ["OPEN", "DONE"] },
  // lists: [{ type: Schema.Types.ObjectId, ref: "task_id" }],
});

// TaskSchema.virtual("lists", {
//   // la ref de la collection
//   ref: "List",
//   // le localfield => champ présent dans la collecion
//   // permettant de faire le lien
//   localField: "_id",
//   // le champ souhaité
//   // foreign field qui sera dans notre liste le champ auteur
//   // donc on ajoutera le champ auteur au livre
//   foreignField: "task_id",
// });

const TaskModel = model<ITask>("Task", TaskSchema);

export { TaskModel, ITask };

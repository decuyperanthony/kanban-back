import mongoose, { model, Schema, Document } from "mongoose";
import { ITask } from "./task";

interface IList extends Document {
  title: string;
  tasks: ITask[];
}
// todo mettre tout les clés de tasks dans list
const ListSchema = new Schema(
  {
    title: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
  }
);

const ListModel = model<IList>("List", ListSchema);

export { ListModel, IList };

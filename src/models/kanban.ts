import { model, Schema, Document } from "mongoose";

interface IKanban extends Document {
  name: string;
  // iso2code: string;
}

const KanbanSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  // iso2code: {
  //   type: String,
  // },
});

const KanbanModel = model<IKanban>("Kanban", KanbanSchema);

export { KanbanModel, IKanban };

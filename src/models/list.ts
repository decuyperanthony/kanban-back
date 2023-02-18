import mongoose, { model, Schema, Document } from "mongoose";

interface IList extends Document {
  status: string;
  lists: {
    ref: string;
    type: string;
  };
}

const ListSchema = new Schema({
  status: String,
  kanban_id: {
    ref: "Kanban",
    type: mongoose.Schema.Types.ObjectId,
  },
});

const ListModel = model<IList>("List", ListSchema);

export { ListModel, IList };

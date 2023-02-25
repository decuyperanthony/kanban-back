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
  task_id: {
    ref: "Task",
    type: mongoose.Schema.Types.ObjectId,
  },
});

const ListModel = model<IList>("List", ListSchema);

export { ListModel, IList };

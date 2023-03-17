import { model, Schema, Document } from "mongoose";

interface ITask extends Document {
  name: string;
  status: "OPEN" | "DONE";
  done: boolean;
  isPrioritized: boolean;
  listId: string;
}

const TaskSchema = new Schema(
  {
    name: String,
    listId: String,
    status: { type: String, default: "OPEN", enum: ["OPEN", "DONE"] },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    done: { type: Boolean, default: false },
    isPrioritized: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const TaskModel = model<ITask>("Task", TaskSchema);

export { TaskModel, ITask };

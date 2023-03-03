import { model, Schema, Document } from "mongoose";

interface ITask extends Document {
  name: string;
  status: "OPEN" | "DONE";
}

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    status: { type: String, default: "OPEN", enum: ["OPEN", "DONE"] },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = model<ITask>("Task", TaskSchema);

export { TaskModel, ITask };
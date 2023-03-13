import { model, Schema, Document } from "mongoose";

interface ITask extends Document {
  name: string;
  status: "OPEN" | "DONE";
  done: boolean;
}

const TaskSchema = new Schema(
  {
    name: String,
    status: { type: String, default: "OPEN", enum: ["OPEN", "DONE"] },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    done: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const TaskModel = model<ITask>("Task", TaskSchema);

export { TaskModel, ITask };

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
    // todo remove OPEN && DONE
    status: { type: String, default: "NONE", enum: ["OPEN", "DONE", "NONE"] },
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

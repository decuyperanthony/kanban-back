import { model, Schema, Document } from "mongoose";

interface ITask extends Document {
  name: string;
  status: "NONE";
  done: boolean;
  isPrioritized: boolean;
  listId: string;
  orderIndex: number;
}

const TaskSchema = new Schema(
  {
    name: String,
    listId: String,

    status: {
      type: String,
      default: "NONE",
      enum: {
        values: ["NONE"],
        message: "`{VALUE}` is not a valid enum value for path `status`",
      },
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    orderIndex: { type: Number, default: 1 },
    done: { type: Boolean, default: false },
    isPrioritized: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const TaskModel = model<ITask>("Task", TaskSchema);

export { TaskModel, ITask };

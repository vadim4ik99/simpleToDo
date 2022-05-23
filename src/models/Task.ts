import mongoose from "mongoose";

interface ITask {
  content: string;
}

interface ItodoTask extends mongoose.Model<TaskDoc> {
  build(attr: ITask): TaskDoc;
}

interface TaskDoc extends mongoose.Document {
  content: string;
}

const Todo = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

Todo.statics.build = (attr: ITask) => {
  return new Task(attr);
};

const Task = mongoose.model<any, ItodoTask>("Task", Todo);

export { Task };

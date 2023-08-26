import { model, Schema } from 'mongoose'
import { Task } from '../../interfaces/task.interface'
import { uuidDBGenerator } from '@/core/utils/UuidGenerator.util'

const taskSchema: Schema = new Schema<Task>(
  {
    _id: {
      type: String,
      default: uuidDBGenerator.generate(),
    },
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      ref: 'User',
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const TaskModel = model<Task>('Task', taskSchema)
export default TaskModel

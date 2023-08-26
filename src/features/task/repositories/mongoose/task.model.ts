import { model, Schema } from 'mongoose'
import { Task } from '../../interfaces/task.interface'
import { UuidGenerator } from '@/core/utils/UuidGenerator.util'

const uuid = new UuidGenerator().generate()

const taskSchema: Schema = new Schema<Task & {_id:string}>(
  {
    _id: {
      type:String,
      default: uuid,
    },
    id: {
      type: String,
      default: uuid,
      unique: true,
      key: true      
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
    id: true,
    toJSON: {
      transform(doc, ret) {
        delete ret._id
      },
    },
    timestamps: true,
    versionKey: false,
  }
)

const TaskModel = model<Task>('Task', taskSchema)
export default TaskModel

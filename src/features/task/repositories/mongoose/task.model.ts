import { model, Schema } from 'mongoose'
import { Task } from '../../interfaces/task.interface'
import { UuidGenerator } from '@/core/utils/UuidGenerator.util'

const taskSchema: Schema = new Schema<Task & {_id:string}>(
  {
    _id: {
      type:String,
    },
    id: {
      type: String,
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

taskSchema.pre('save', async function(next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate();

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid;
  this.id = uuid;

  // Continúa con el proceso de guardado
  next();
});

const TaskModel = model<Task>('Task', taskSchema)
export default TaskModel

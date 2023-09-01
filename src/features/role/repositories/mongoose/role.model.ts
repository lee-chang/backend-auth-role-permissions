import { Schema, model, Types } from 'mongoose'
import { IRole } from '../../interfaces/role.interface'
import { UuidGenerator } from '@/core/utils/UuidGenerator.util'

const roleSchema = new Schema<IRole & {_id:string}>(
  {
    _id: {
      type:String,
    },
    id: {
      type: String,
      unique: true,
      key: true,
    },
    name: {
      type: String,
      require: true,
      unique: true,
    },
    permissions: {
      type: [String],
    },
    users: [
      {
        ref: 'User',
        type: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    id: true,
    toJSON: {
      transform(doc, ret) {
        delete ret._id
      }
    },
    timestamps: true,
    versionKey: false,
  }
)

roleSchema.pre('save', async function(next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate();

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid;
  this.id = uuid;

  // Continúa con el proceso de guardado
  next();
});

export const RoleModel = model<IRole>('Role', roleSchema)

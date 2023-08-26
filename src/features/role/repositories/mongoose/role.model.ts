import { Schema, model, Types } from 'mongoose'
import { IRole } from '../../interfaces/role.interface'
import { UuidGenerator } from '@/core/utils/UuidGenerator.util'

const uuid = new UuidGenerator().generate()

const roleSchema = new Schema<IRole & {_id:string}>(
  {
    _id: {
      type:String,
      default: uuid
    },
    id: {
      type: String,
      default: uuid,
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

export const RoleModel = model<IRole>('Role', roleSchema)

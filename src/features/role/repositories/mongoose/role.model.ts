import { Schema, model } from 'mongoose'
import { IRole } from '../../interfaces/role.interface'
import { uuidDBGenerator } from '@/core/utils/UuidGenerator.util' 

const roleSchema = new Schema<IRole>(
  {
    _id: {
      type: String,
      default: uuidDBGenerator.generate(),
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
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const RoleModel = model<IRole>('Role', roleSchema)
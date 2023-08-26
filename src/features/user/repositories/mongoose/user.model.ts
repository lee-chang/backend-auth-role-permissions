import { IUser } from '../../interfaces/user.interface'
import { UuidGenerator } from '@/core/utils/UuidGenerator.util'
import { model, Schema } from 'mongoose'

import { phoneSchema } from '@/features/shared/repositories/mongoose/phone.model'
import { addressSchema } from '@/features/shared/repositories/mongoose/address.model'

const userSchema: Schema = new Schema<IUser>(
  {
    _id: {
      type: String,
      default: new UuidGenerator().generate(),
    },
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    authority: [
      {
        type: String,
        ref: 'Role',
      },
    ],
    fullName: {
      type: String,
      trim: true,
    },
    phone: [
      {
        type: phoneSchema,
      },
    ],
    address: [
      {
        type: addressSchema,
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
    login_code: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const UserModel = model<IUser>('User', userSchema)
export default UserModel

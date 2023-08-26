import { IUser } from '../../interfaces/user.interface'
import { UuidGenerator } from '@/core/utils/UuidGenerator.util'
import { model, Schema } from 'mongoose'

import { phoneSchema } from '@/features/shared/repositories/mongoose/phone.model'
import { addressSchema } from '@/features/shared/repositories/mongoose/address.model'

const uuid = new UuidGenerator().generate()

const userSchema: Schema = new Schema<IUser & {_id:string}>(
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

const UserModel = model<IUser>('User', userSchema)
export default UserModel

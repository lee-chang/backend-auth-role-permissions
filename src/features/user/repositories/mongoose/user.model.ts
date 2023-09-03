import { IUser } from '../../interfaces/user.interface'
import { UuidGenerator } from '@/core/utils/UuidGenerator.util'
import { model, Schema } from 'mongoose'

import { phoneSchema } from '@/features/shared/repositories/mongoose/phone.model'
import { addressSchema } from '@/features/shared/repositories/mongoose/address.model'


const userSchema: Schema = new Schema<IUser & {_id:string}>(
  {
    _id: {
      type:String,
    },
    id: {
      type: String,
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
    role: [
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

userSchema.pre('save', async function(next) {
  // Crea un id de ira
  const uuid = new UuidGenerator().generate();

  // Asigna el id de ira a los atributos _id e id
  this._id = uuid;
  this.id = uuid;

  // Continúa con el proceso de guardado
  next();
});

const UserModel = model<IUser>('User', userSchema)
export default UserModel

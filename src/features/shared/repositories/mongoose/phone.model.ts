import { model, Schema } from 'mongoose'

import { IPhone } from '../../interfaces/phone.interface'

export const phoneSchema: Schema = new Schema<IPhone>({
  code: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
})

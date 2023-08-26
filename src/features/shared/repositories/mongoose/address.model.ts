import {  Schema } from 'mongoose'

import { IAddress } from '../../interfaces/address.interface'

export const addressSchema: Schema = new Schema<IAddress>({
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  number: {
    type: String,
  },
  reference: {
    type: String,
  },
  zipCode: {
    type: String,
  }
})

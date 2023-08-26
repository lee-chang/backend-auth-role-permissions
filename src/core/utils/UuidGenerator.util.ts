import { v4 as uuidV4, v1 as uuidV1 } from 'uuid'

import ObjectId from 'bson-objectid'



export interface UuidGenerator {
  generate: () => string
}

export const uuidV4Generator: UuidGenerator = {
  generate: () => uuidV4(),
}

export const uuidV1Generator: UuidGenerator = {
  generate: () => uuidV1(),
}

export const uuidDBGenerator: UuidGenerator = {
  generate: () => bsonObjectIdDB(),
}

function bsonObjectIdDB() {
  const objectId = new ObjectId()
  const objectIdString = objectId.toString()
  return objectIdString
}
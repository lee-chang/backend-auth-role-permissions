import { v4 as uuidV4, v1 as uuidV1 } from 'uuid'

import ObjectId from 'bson-objectid'


interface UuidGeneratorPort {
  generate: () => string
}


export class UuidGenerator implements UuidGeneratorPort{
  private uuidGenerator: UuidGeneratorPort
  constructor() {
    this.uuidGenerator = new UuidGeneratorUtil().uuidV4Generator
  }
  generate(): string {
    return this.uuidGenerator.generate()
  }

}




export class UuidGeneratorUtil {
  uuidV4Generator: UuidGeneratorPort = {
    generate: () => uuidV4(),
  }

  uuidV1Generator: UuidGeneratorPort = {
    generate: () => uuidV1(),
  }

  objectIdGenerator: UuidGeneratorPort = {
    generate: () => {
      const objectId = new ObjectId()
      const objectIdString = objectId.toString()
      return objectIdString
    }
  }


}

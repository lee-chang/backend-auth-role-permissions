import mongoose from "mongoose";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { Buffer } from "buffer";

export class UUIDSchemaType extends mongoose.Schema.Types.UUID {
  constructor(key: string, options?: mongoose.SchemaTypeOptions<unknown>) {
    super(key, options);
    this.validate(uuidValidate, "Invalid UUID format");
  }

  cast(val: string | Buffer | unknown): string {
    if (typeof val === "string" && uuidValidate(val)) {
      return val;
    }
    throw new Error("Invalid UUID format");
  }

  static get nameUUID(): string {
    return "UUID";
  }
} 
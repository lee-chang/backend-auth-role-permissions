import { HttpStatus } from "@/core/interfaces/httpStatus.interface";
import { ErrorExt } from "@/core/utils/http.response.util";

export const notUndefinedOrNull = <T>(field: T | undefined | null): T => {
  if (field === undefined || field === null) {
    throw new ErrorExt("DATA_NOT_RECEIVED", HttpStatus.BAD_REQUEST);
  }
  return field;
}
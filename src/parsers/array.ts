import { ZodArrayDef, ZodTypeDef } from "zod";
import { JsonSchema7Type, parseDef } from "../parseDef";

export type JsonSchema7ArrayType = {
  type: "array";
  items?: JsonSchema7Type;
  minItems?: number;
  maxItems?: number;
};

export function parseArrayDef(
  def: ZodArrayDef,
  path: string[],
  visited: { def: ZodTypeDef; path: string[] }[],
  nonEmpty: boolean
) {
  {
    const res: JsonSchema7ArrayType = {
      type: "array",
      items: parseDef(def.type, [...path, "items"], visited),
    };
    if (nonEmpty) {
      res.minItems = 1;
    }
    if (def.minLength) {
      res.minItems = def.minLength.value;
    }
    if (def.maxLength) {
      res.maxItems = def.maxLength.value;
    }

    return res;
  }
}

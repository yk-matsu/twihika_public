import Ajv, { JSONSchemaType } from "ajv";

export interface MayBeEventBridgeEvent {
  id: string;
  version: string;
  account: string;
  time: string;
  region: string;
  resources: string[];
  source: string;
}

export interface MyEvent {
  user_id: string;
}

export const mayBeEventBridgeEvent = (data: any) => {
  const ajv = new Ajv();
  const constraints: JSONSchemaType<MayBeEventBridgeEvent> = {
    type: "object",
    properties: {
      id: { type: "string" },
      version: { type: "string" },
      account: { type: "string" },
      time: { type: "string" },
      region: { type: "string" },
      resources: { type: "array", items: { type: "string" } },
      source: { type: "string" },
    },
    required: [
      "id",
      "version",
      "account",
      "time",
      "region",
      "resources",
      "source",
    ],
    additionalProperties: true,
  };
  const validate = ajv.compile(constraints);
  if (validate(data)) {
    return true;
  }
  return false;
};

export const isMyEvent = (data: any): data is MyEvent => {
  const ajv = new Ajv();
  const constraints: JSONSchemaType<MyEvent> = {
    type: "object",
    properties: {
      user_id: { type: "string" },
    },
    required: ["user_id"],
    additionalProperties: true,
  };
  const validate = ajv.compile(constraints);
  return validate(data)
};

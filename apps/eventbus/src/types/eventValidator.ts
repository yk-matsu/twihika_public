import Ajv, { JSONSchemaType } from "ajv";
import { SignedInWIthGoogle, TwitetrIntergrated } from "./event";

export const validateTwitterIntegrateed = (data) => {
  const ajv = new Ajv();

  const constraints: JSONSchemaType<TwitetrIntergrated> = {
    type: "object",
    additionalProperties: false,
    properties: {
      userId: { type: "string" },
      accessToken: { type: "string" },
      providerAccountId: { type: "string" },
      refreshToken: { type: "string", nullable: true},
      providerId: { type: "string" },
      secret: { type: "string" },
      resourceId: { type: "string"}
    },
    required: [
      "userId",
      "accessToken",
      "providerAccountId",
      "providerId",
      "secret",
      "resourceId"
    ],
  };

  const validate = ajv.compile(constraints);
  if (validate(data)) {
    return data;
  } else {
    console.log(validate.errors);
    throw new Error(validate.errors!.map((err) => err.message).join("\n"));
  }
};

export const validateSignedInWithGoogle = (data) => {
  const ajv = new Ajv();

  const constraints: JSONSchemaType<SignedInWIthGoogle> = {
    type: "object",
    additionalProperties: true,
    properties: {
      email: { type: "string" },
      userId: { type: "string" },
      providerAccountId: { type: "string" },
      providerId: { type: "string" },
      resourceId: { type: "string"}
    },
    required: [
      "email",
      "userId",
      "providerAccountId",
      "providerId",
      "resourceId"
    ],
  };

  const validate = ajv.compile(constraints);
  if (validate(data)) {
    return data;
  } else {
    console.log(validate.errors);
    throw new Error(validate.errors!.map((err) => err.message).join("\n"));
  }
};
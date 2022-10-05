import Ajv, { JSONSchemaType } from "ajv";
export interface AccessToken {
  secret: string;
  access_token: string;
  user_id: string;
  provider_account_id: string;
  since_id: string;
}

export interface OriginalTweetMetaFromPostgres {
  s3_bucket: string;
  s3_region: string;
  s3_key: string;
  end_id: string;
}

export const validateOriginalTweetMetaFromPostgres = (data) => {
  const ajv = new Ajv();

  const constraints: JSONSchemaType<OriginalTweetMetaFromPostgres[]> = {
    type: "array",
    items: {
      type: "object",
      additionalProperties: false,
      properties: {
        s3_bucket: { type: "string" },
        s3_region: { type: "string" },
        s3_key: { type: "string" },
        end_id: { type: "string" },
      },
      required: ["s3_bucket", "s3_region", "s3_key", "end_id"],
    },
  };

  const validate = ajv.compile(constraints);
  if (validate(data)) {
    return data;
  } else {
    console.log(validate.errors);
    throw new Error(validate.errors!.map((err) => err.message).join("\n"));
  }
};

export const validateAccessToken = (data) => {
  const ajv = new Ajv();

  const constraints: JSONSchemaType<AccessToken[]> = {
    type: "array",
    items: {
      type: "object",
      properties: {
        secret: { type: "string" },
        access_token: { type: "string" },
        user_id: { type: "string" },
        provider_account_id: { type: "string" },
        since_id: { type: "string", nullable: true },
      },
      required: ["secret", "access_token", "user_id", "provider_account_id"],
      additionalProperties: false,
    },
  };

  const validate = ajv.compile(constraints);
  if (validate(data)) {
    return data;
  } else {
    console.log(validate.errors);
    throw new Error(validate.errors!.map((err) => err.message).join("\n"));
  }
};
import Ajv, {JSONSchemaType} from "ajv"

export type createTwitterApiQueryOption = {
  q: string;
  since_id?: string;
};

export interface RegisteredTweetMeta {
  query_id: number;
  s3_bucket: string;
  s3_key: string;
}

export const validateRegisteredTweetMeta = (data) => {
  const ajv = new Ajv();

  const constraints: JSONSchemaType<RegisteredTweetMeta[]> = {
    type: "array",
    items: {
      type: "object",
      properties: {
        query_id: { type: "number" },
        s3_bucket: { type: "string" },
        s3_key: { type: "string" },
      },
      required: ["query_id", "s3_bucket", "s3_key"],
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

export interface SinceIdAndQuery {
  query: string;
  query_id: number;
  since_id?: string;
}

export const validateSinceIdAndQuery = (data) => {
  const ajv = new Ajv();

  const constraints: JSONSchemaType<SinceIdAndQuery[]> = {
    type: "array",
    items: {
      type: "object",
      properties: {
        since_id: { type: "string", nullable: true },
        query: { type: "string" },
        query_id: { type: "number" },
      },
      required: ["query_id", "query"],
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

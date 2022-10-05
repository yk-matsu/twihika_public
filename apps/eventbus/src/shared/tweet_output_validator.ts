import Ajv, { JSONSchemaType } from "ajv";
import { toMap } from "./util";

export interface TweeetLiteType {
  id_str: string;
  full_text: string;
  user: {
    id_str: string;
    screen_name: string;
    name: string;
  };
  created_at: string;
  extended_entities?: {
    media: {
      type: string;
      media_url_https?: string;
      video_info?: {
        duration_millis?: number;
        aspect_ratio: number[];
        variants: {
          content_type: string;
          url: string;
          bitrate?: number;
        }[];
      };
    }[];
  };
}

export const validateAsTweet = (data) => {
  const ajv = new Ajv();

  const constraints: JSONSchemaType<TweeetLiteType[]> = {
    type: "array",
    items: {
      type: "object",
      additionalProperties: true,
      required: ["id_str", "user", "full_text", "created_at"],
      properties: {
        id_str: { type: "string" },
        full_text: { type: "string" },
        created_at: { type: "string"},
        user: {
          type: "object",
          additionalProperties: true,
          properties: {
            id_str: {
              type: "string",
            },
            screen_name: {
              type: "string",
            },
            name: {
              type: "string",
            },
          },
          required: ["id_str", "screen_name", "name"],
        },
        extended_entities: {
          nullable: true,
          additionalProperties: true,
          type: "object",
          required: ["media"],
          properties: {
            media: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: true,
                required: ["type"],
                properties: {
                  type: { type: "string" },
                  media_url_https: { type: "string", nullable: true },
                  video_info: {
                    nullable: true,
                    type: "object",
                    additionalProperties: true,
                    required: ["variants"],
                    properties: {
                      duration_millis: { type: "number", nullable: true },
                      aspect_ratio: {
                        type: "array",
                        items: { type: "number" },
                      },
                      variants: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: true,
                          required: ["content_type", "url"],
                          properties: {
                            content_type: {
                              type: "string",
                            },
                            url: {
                              type: "string",
                            },
                            bitrate: {
                              nullable: true,
                              type: "number",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  const validate = ajv.compile(constraints);
  if (validate(data)) {
    const dataMap = toMap('id_str', data)
    const descTweetIdTweets = (Array.from(dataMap.keys()) as any as string[])
      //@ts-ignore
      .sort((a, b) => b - a)
      .map((key:string) => dataMap.get(key)!);
    const originalIdsOrder = descTweetIdTweets.map((item) => item.id_str);
    const cloneIds: string[] = JSON.parse(JSON.stringify(originalIdsOrder));
    // @ts-ignore
    // 降順で並び替えを行う
    cloneIds.sort((a, b) => b - a);
    if (
      !(
        originalIdsOrder[0] == cloneIds[0] &&
        originalIdsOrder[originalIdsOrder.length - 1] ==
          cloneIds[cloneIds.length - 1]
      )
    ) {
      throw new Error("order is not expected");
    }
    return descTweetIdTweets;
  } else {
    console.log(validate.errors);
    throw new Error(validate.errors!.map((err) => err.message).join("\n"));
  }
};

/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
import type { IncomingMessage } from "http";
import type { Session } from "next-auth";

export declare module "next" {
  interface NextApiRequest extends IncomingMessage {
    csrfToken: ()=> void
  }
}

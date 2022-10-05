// import { GraphQLClient } from "graphql-request";
// import getenv from "getenv";

// import { getSdk } from "./generated";

// const client = new GraphQLClient(
//   getenv("HASURA_GRAPHQL_ENDPOINT") + "/v1/graphql",
//   {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }
// );
// export const request = getSdk(client);
export  * from "./generated"
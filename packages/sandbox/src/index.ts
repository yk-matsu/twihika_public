import * as queryString from 'query-string';
import getenv from 'getenv';
import type { AxiosInstance } from "axios"
const axios = require('axios') ;

export const createBearerTokenAccessClientForV1 = (): AxiosInstance => {
  return axios.create({
    baseURL: `https://api.twitter.com`,
    headers: {
      Authorization: `Bearer ${getenv('TWIHIKA_TWITTER_BEARER_TOKEN')}`,
    },
  });
};

type createTwitterApiQueryOption = {
  screen_name: string;
  since_id?: string;
};
const createTwitterApiQuery = (option: createTwitterApiQueryOption) => {
  const query = {
    lang: 'ja',
    locale: 'ja',
    result_type: 'recent',
    count: '100',
    tweet_mode: 'extended',
    exclude_replies: true,
    ...option,
  };
  if (!option.since_id) {
    delete query['since_id'];
  }
  return query;
};
const main = async () => {
  const client = createBearerTokenAccessClientForV1();
  const res = await client.get(
    `/1.1/statuses/user_timeline.json?${queryString.stringify(
      createTwitterApiQuery({
        screen_name: "webkirin" ,
      })
    )}`
  );
  //@ts-ignore
  console.log(res.data)
};

main()

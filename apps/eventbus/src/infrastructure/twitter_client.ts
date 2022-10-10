import * as crypto from 'crypto'
import axios, { AxiosInstance } from 'axios'
import * as queryString from 'query-string'
import * as getenv from 'getenv'
import { validateAsTweet } from '../shared/tweet_output_validator'

const getNonce = () => {
  const wordCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < 32; i++) {
    result += wordCharacters[Math.trunc(Math.random() * wordCharacters.length)];
  }

  return result;
}
const getTimestamp = () => {
  return Math.trunc(new Date().getTime() / 1000);
}

const percentEncode = (str) => {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/\*/g, '%2A')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
}


export const callTwitterApiWithUserAccessToken = async (url, { secret, accessToken, option = {} }) => {
  const additionalQuery = { tweet_mode: 'extended', exclude_replies: false, count: 200, ...option };
  const params_b = {
    oauth_consumer_key: getenv('TWIHIKA_COMSUMER_KEY_API_KEY'),
    oauth_nonce: getNonce(),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: getTimestamp(),
    oauth_token: accessToken,
    oauth_version: '1.0'
  };

  const merged = { ...params_b, ...additionalQuery }
  const query = percentEncode(queryString.stringify(Object.fromEntries(Object.entries(merged).sort())));
  const method = "GET";
  const uri = percentEncode(url);

  const signatureData = method + "&" + uri + "&" + query
  const signqtureKey = `${percentEncode(getenv('TWIHIKA_COMSUMER_KEY_API_SECRET'))}&${percentEncode(secret)}`
  const hash = crypto.createHmac('sha1', signqtureKey)
    .update(signatureData)
    .digest("base64") // binary buffer
  merged['oauth_signature'] = hash
  function sortObject(data) {
    return Object.keys(data)
      .sort()
      .map(key => ({ key, value: data[key] }));
  }
  const response = await axios({
    method: 'get',
    url: `${url}?${queryString.stringify(Object.fromEntries(Object.entries(additionalQuery).sort()))}`,
    headers: {
      'Authorization': `OAuth ${sortObject(merged).map(item => percentEncode(item.key) + "=" + "\"" + percentEncode(item.value) + "\"").join(',')}`,
    }
  });
  return validateAsTweet(response.data);
}


export const createBearerTokenAccessClientForV1 = (): AxiosInstance => {
  const token = getenv('TWIHIKA_TWITTER_BEARER_TOKEN')
  return axios.create({
    baseURL: `https://api.twitter.com`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
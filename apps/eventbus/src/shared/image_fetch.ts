import * as request from "request";
export const imageFetch = (url): any => {
  var options = {
    uri: url,
    encoding: null,
  };
  return new Promise((resolve, reject) => {
    request(options, async function (error, response, body) {
      if (error || response.statusCode !== 200) {
        reject(error);
        console.log(error);
      } else {
        resolve(body);
      }
    });
  });
};
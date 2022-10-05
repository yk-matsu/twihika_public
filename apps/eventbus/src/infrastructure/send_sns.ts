import * as AWS from "aws-sdk"
import * as getenv from "getenv"

AWS.config.update({
  region: getenv('REGION')
})


export const sendErrorHandlerSNS = async (from, error: Error, action) => {
  const snsClient = new AWS.SNS()
  return await snsClient.publish({
    TopicArn: getenv('TWIHIKA_ERROR_HANDLER_SNS'),
    Message: JSON.stringify({
      from,
      action,
      text: `${error.toString()}\n${error.stack}`
    })
  }).promise()
}
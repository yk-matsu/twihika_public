import fetch from 'node-fetch'
export const sendToLine = async (messages: any) =>{
  const token = "F4WJ6g9z4AIGTb9b424p1HgcDk6pRtkknfaQinERdlU";
  const params = new URLSearchParams({
    message: messages,
});
  const options =
   {
     "method"  : "post",
     "headers" : {"Authorization" : "Bearer "+ token, "Content-Type": 'application/x-www-form-urlencoded'},
     "body" : params.toString()

   };

   await fetch("https://notify-api.line.me/api/notify", options);
}
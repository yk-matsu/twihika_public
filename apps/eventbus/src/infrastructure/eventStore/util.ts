export const flat = (arr: any[]) => {
  return arr.reduce((acc, current) => acc.concat(current), [])
}

export const getCurrentTime = () => {
  return new Promise((resolve) => {
    resolve(Date.now())
    /*
    ntpClient.getNetworkTime(timeSyncEndpoint, 123, function(err, date) {
      if (err) {
        reject(err)
        return
      }

      const jsDate = new Date(date)
      resolve(jsDate.getTime())
    })
    */
  })
}

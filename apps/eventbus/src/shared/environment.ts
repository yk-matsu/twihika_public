import * as getenv from 'getenv'
export const isTest = ():boolean => {
  return getenv("DEVELOPMENT_MODE") == "test";
}
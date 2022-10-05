import * as crypto from 'crypto'
export const toMap = <T, K extends keyof T>(key: K, arr: T[]): Map<T[K], T> => {
  return arr
    .map<[T[K], T]>((e) => [e[key], e]) // ['キーにしたい値', T] のtupleを作る
    .reduce<Map<T[K], T>>((acc, [k, v]) => {
      // Map Objectを作成 & set して returnする。
      acc.set(k, v);
      return acc;
    }, new Map<T[K], T>());
};
export const isNotEmpty = (obj) => {
  return Object.keys(obj).length !== 0;
};


export const md5hex = (str ) => {
  const md5 = crypto.createHash('md5')
  return md5.update(str, 'binary').digest('hex')
}
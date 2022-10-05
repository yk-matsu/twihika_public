import { atom } from 'recoil'

export const searchState = atom<{queryIds: number[], createdAtGte: string}>({
  key: 'search',
  default: {
    queryIds: [],
    createdAtGte: ""
  }
})
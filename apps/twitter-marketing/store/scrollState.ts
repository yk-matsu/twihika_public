import { atom } from 'recoil'

export const scrollState = atom<boolean>({
  key: 'scrolled',
  default: false
})
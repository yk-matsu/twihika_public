import { Event } from "../../types/event";

export type Reducer = (events: Event[], initialState: {}) => any

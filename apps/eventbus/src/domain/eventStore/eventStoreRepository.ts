import { Event } from '../../types/event';
export type GetByIdOptions = {
  version?: number
  returnArrayIfNoRecord?: boolean
}

export type SnapshotState = {
  state: any,
  version: number
}

export interface EventStoreRepository {
  getById(id: string, options?: GetByIdOptions): any
  getByIdUsingSnapshot(params: { resourceId: string,
  reducerId: string, reducerVersion: number, reducer: (events: Event[], initialState?: any) => any}): Promise<SnapshotState>
  getByIdAndVersion(id: string, version: number, consistentRead: boolean): any
  save(params: { events: Event[], resourceId: string, expectedVersion: number }): any
}
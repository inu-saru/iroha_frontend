export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export type SearchParams = Record<string, string>

export type Merge<T> = {
  [K in keyof T]: T[K]
}

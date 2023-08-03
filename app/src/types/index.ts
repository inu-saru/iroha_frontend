export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export type SearchParams = Record<string, string>

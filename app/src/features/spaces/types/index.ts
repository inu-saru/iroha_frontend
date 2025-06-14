import { type BaseEntity } from "@/types"

export type Space = {
  name: string
  language_types: string[]
} & BaseEntity

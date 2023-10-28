import { type BaseEntity } from "@/types"
import { type Vocabulary } from "@/features/vocabularies/types"

export type BatchRelationship = [
  { body: Vocabulary; header: any; status: number },
  { body: Relationship; header: any; status: number }
]

export type Relationship = {
  followed: Vocabulary
  follower: Vocabulary
  language_type: string
  positions: [number]
} & BaseEntity

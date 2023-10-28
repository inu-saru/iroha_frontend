import { type BaseEntity } from "@/types"
import { type Vocabulary } from "@/features/vocabularies/types"

export type Relationship = [
  { body: Vocabulary; header: any; status: number },
  { body: RelationshipAsset; header: any; status: number }
]

export type RelationshipAsset = {
  followed_id: number
  follower_id: number
  language_type: string
  positions: [number]
} & BaseEntity

export type Follow = {
  relationship_id: string
  positions: string
} & Vocabulary

export type WipRelationship = {
  followed: Vocabulary
  follower: Vocabulary
  language_type: string
  positions: [number]
} & BaseEntity

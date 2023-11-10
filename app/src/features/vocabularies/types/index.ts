import { type BaseEntity } from "@/types"

export type Vocabulary = {
  vocabulary_type: string
  en: string
  ja: string
  section_id: number
} & BaseEntity

export interface VocabularySearchParams {
  q?: string
  sid?: string
  vocabulary_type?: string
}

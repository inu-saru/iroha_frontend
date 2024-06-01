import { ContentLayout } from "@/components/Layout"
import { InnerSpaceNav } from "@/features/misc/components/InnerSpaceNav"
import { ContentHeaderVocabulary } from "../components/ContentHeaderVocabulary"
import { ContentElementVocabulary } from "../components/ContentElementVocabulary"
import { ListVocabularies } from "../components/ListVocabularies"
import { ContentItemsRelationship } from "@/features/relationships/components/ContentItemsRelationship"
import { RelationshipContentFooter } from "@/features/relationships/composer/RelationshipContentFooter"
import { useState } from "react"
import { type VocabularyTypes } from "../types"

export const Vocabulary = (): JSX.Element => {
  const [vocabularyType, setVocabularyType] = useState<VocabularyTypes | null>(null)
  
  return (
    <>
      <ContentLayout
        title="ボキャブラリー詳細"
        nav={<InnerSpaceNav />}
        list={<ListVocabularies />}
      >
        <div className="flex flex-col h-screen">
          <ContentHeaderVocabulary />
          <ContentElementVocabulary updateVocabularyType={setVocabularyType} />
          { 
            (vocabularyType != null) &&
            <div className="flex-1 overflow-y-auto">
              <ContentItemsRelationship vocabularyType={vocabularyType} />
            </div>
          }
          <RelationshipContentFooter />
        </div>
      </ContentLayout>
    </>
  )
}

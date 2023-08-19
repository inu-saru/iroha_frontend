import { ContentLayout } from "@/components/Layout"
import { InnerSpaceNav } from "@/features/misc/components/InnerSpaceNav"
import { ContentElementVocabularyUpdate } from "../components/ContentElementVocabularyUpdate"
import { ListVocabularies } from "../components/ListVocabularies"

export const VocabularyUpdate = (): JSX.Element => {
  return (
    <>
      <ContentLayout
        title="ボキャブラリー作成"
        nav={<InnerSpaceNav />}
        list={<ListVocabularies />}
      >
        <ContentElementVocabularyUpdate />
      </ContentLayout>
    </>
  )
}

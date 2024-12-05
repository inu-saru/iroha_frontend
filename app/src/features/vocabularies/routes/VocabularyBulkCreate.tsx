import { ContentLayout } from "@/components/Layout"
import { InnerSpaceNav } from "@/features/misc/components/InnerSpaceNav"
import { ContentElementVocabularyBulkCreate } from "../components/ContentElementVocabularyBulkCreate"
import { ListVocabularies } from "../components/ListVocabularies"

export const VocabularyBulkCreate = (): JSX.Element => {
  return (
    <>
      <ContentLayout
        title="ボキャブラリー一括作成"
        nav={<InnerSpaceNav />}
        list={<ListVocabularies />}
      >
        <ContentElementVocabularyBulkCreate />
      </ContentLayout>
    </>
  )
}

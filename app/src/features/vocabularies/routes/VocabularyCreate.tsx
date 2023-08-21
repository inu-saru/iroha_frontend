import { ContentLayout } from "@/components/Layout"
import { InnerSpaceNav } from "@/features/misc/components/InnerSpaceNav"
import { ContentElementVocabularyCreate } from "../components/ContentElementVocabularyCreate"
import { ListVocabularies } from "../components/ListVocabularies"

export const VocabularyCreate = (): JSX.Element => {
  return (
    <>
      <ContentLayout
        title="ボキャブラリー作成"
        nav={<InnerSpaceNav />}
        list={<ListVocabularies />}
      >
        <ContentElementVocabularyCreate />
      </ContentLayout>
    </>
  )
}

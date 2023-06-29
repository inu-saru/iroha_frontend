import { ContentLayout } from "@/components/Layout"
import { SpaceNav } from "@/features/nav"
import { ContentElementVocabularyUpdate } from "../components/ContentElementVocabularyUpdate"
import { ListVocabularies } from "../components/ListVocabularies"

export const VocabularyUpdate = (): JSX.Element => {
  return (
    <>
      <ContentLayout
        title="ボキャブラリー作成"
        nav={<SpaceNav />}
        list={<ListVocabularies />}
      >
        <ContentElementVocabularyUpdate />
      </ContentLayout>
    </>
  )
}

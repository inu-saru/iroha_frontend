import { ContentLayout } from "@/components/Layout"
import { SpaceNav } from "@/features/nav"
import { ContentElementVocabularyCreate } from "../components/ContentElementVocabularyCreate"
import { ListVocabularies } from "../components/ListVocabularies"

export const VocabularyCreate = (): JSX.Element => {
  return (
    <>
      <ContentLayout
        title="ボキャブラリー作成"
        nav={<SpaceNav />}
        list={<ListVocabularies />}
      >
        <ContentElementVocabularyCreate />
      </ContentLayout>
    </>
  )
}

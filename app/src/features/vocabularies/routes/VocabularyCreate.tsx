import { ContentLayoutShow } from "@/components/Layout/ContentLayoutShow"
import { SpaceNav } from "@/features/nav"
import { ContentElementVocabularyCreate } from "../components/ContentElementVocabularyCreate"
import { ListVocabularies } from "../components/ListVocabularies"

export const VocabularyCreate = (): JSX.Element => {
  return (
    <>
      <ContentLayoutShow
        title="ボキャブラリー作成"
        nav={<SpaceNav />}
        list={<ListVocabularies />}
      >
        <ContentElementVocabularyCreate />
      </ContentLayoutShow>
    </>
  )
}

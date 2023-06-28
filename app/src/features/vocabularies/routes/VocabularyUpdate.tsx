import { ContentLayoutShow } from "@/components/Layout/ContentLayoutShow"
import { SpaceNav } from "@/features/nav"
import { ContentElementVocabularyUpdate } from "../components/ContentElementVocabularyUpdate"
import { ListVocabularies } from "../components/ListVocabularies"

export const VocabularyUpdate = (): JSX.Element => {
  return (
    <>
      <ContentLayoutShow
        title="ボキャブラリー作成"
        nav={<SpaceNav />}
        list={<ListVocabularies />}
      >
        <ContentElementVocabularyUpdate />
      </ContentLayoutShow>
    </>
  )
}

import { ContentLayoutShow } from "@/components/Layout/ContentLayoutShow"
import { SpaceNav } from "@/features/nav"
import { ListVocabularies } from "../components/ListVocabularies"

export const Vocabulary = (): JSX.Element => {
  return (
    <>
      <ContentLayoutShow
        title="ボキャブラリー詳細"
        nav={<SpaceNav />}
        list={<ListVocabularies />}
      >
        content
      </ContentLayoutShow>
    </>
  )
}

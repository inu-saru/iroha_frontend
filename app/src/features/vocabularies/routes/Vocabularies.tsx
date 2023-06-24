import { ContentLayoutInSpace } from "@/components/Layout/ContentLayoutInSpace"
import { ListVocabularies } from "../components/ListVocabularies"

export const Vocabularies = (): JSX.Element => {
  return (
    <>
      <ContentLayoutInSpace title="ボキャブラリー一覧">
        <ListVocabularies />
      </ContentLayoutInSpace>
    </>
  )
}

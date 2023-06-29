import { ContentLayoutInSpace } from "@/components/Layout/ContentLayoutInSpace"
import { SpaceNav } from "@/features/nav"
import { ListVocabularies } from "../components/ListVocabularies"

export const Vocabularies = (): JSX.Element => {
  return (
    <>
      <ContentLayoutInSpace title="ボキャブラリー一覧" nav={<SpaceNav />}>
        <ListVocabularies />
      </ContentLayoutInSpace>
    </>
  )
}

import { ListLayout } from "@/components/Layout"
import { InnerSpaceNav } from "@/features/misc/components/InnerSpaceNav"
import { ListVocabularies } from "../components/ListVocabularies"

export const Vocabularies = (): JSX.Element => {
  return (
    <>
      <ListLayout title="ボキャブラリー一覧" nav={<InnerSpaceNav />}>
        <ListVocabularies />
      </ListLayout>
    </>
  )
}

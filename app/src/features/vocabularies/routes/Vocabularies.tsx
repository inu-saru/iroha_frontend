import { ListLayout } from "@/components/Layout"
import { SpaceNav } from "@/features/nav"
import { ListVocabularies } from "../components/ListVocabularies"

export const Vocabularies = (): JSX.Element => {
  return (
    <>
      <ListLayout title="ボキャブラリー一覧" nav={<SpaceNav />}>
        <ListVocabularies />
      </ListLayout>
    </>
  )
}

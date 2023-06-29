import { ContentLayout } from "@/components/Layout"
import { SpaceNav } from "@/features/nav"
import { ContentElementVocabulary } from "../components/ContentElementVocabulary"
import { ListVocabularies } from "../components/ListVocabularies"

export const Vocabulary = (): JSX.Element => {
  return (
    <>
      <ContentLayout
        title="ボキャブラリー詳細"
        nav={<SpaceNav />}
        list={<ListVocabularies />}
      >
        <ContentElementVocabulary />
      </ContentLayout>
    </>
  )
}

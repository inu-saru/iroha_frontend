import { ContentLayout } from "@/components/Layout"
import { InnerSpaceNav } from "@/features/misc/components/InnerSpaceNav"
import { ContentElementVocabulary } from "../components/ContentElementVocabulary"
import { ListVocabularies } from "../components/ListVocabularies"

export const Vocabulary = (): JSX.Element => {
  return (
    <>
      <ContentLayout
        title="ボキャブラリー詳細"
        nav={<InnerSpaceNav />}
        list={<ListVocabularies />}
      >
        <ContentElementVocabulary />
      </ContentLayout>
    </>
  )
}

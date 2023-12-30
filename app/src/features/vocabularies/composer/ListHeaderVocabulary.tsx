import { ListHeader } from "@/components/List"
import { ListHeaderSection } from "@/features/sections/components/ListHeaderSection"
import { DropDownSortVocabulary } from "../components/DropDownSortVocabulary"

export const ListHeaderVocabulary = (): JSX.Element => {
  return (
    <>
      <ListHeader>
        <div className="flex items-center">
          <div className="flex-1">
            <ListHeaderSection />
          </div>
          <div className="flex-0">
            <DropDownSortVocabulary />
          </div>
        </div>
      </ListHeader>
    </>
  )
}

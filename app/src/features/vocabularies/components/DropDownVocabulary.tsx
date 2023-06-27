import { DropDown } from "@/components/DropDown"
import { DropDownItem } from "@/components/DropDown/DropDownItem"
import { Icon } from "@/components/Elements"

interface DropDownVocabularyProps {
  resourceId: string
  label: string
}

export const DropDownVocabulary = ({
  resourceId,
  label
}: DropDownVocabularyProps): JSX.Element => {
  return (
    <DropDown trigger={<Icon variant="moreHoriz" bgColor="white" />}>
      <DropDownItem
        label="編集"
        handleClick={() => {
          console.log(`WIP edit id: ${resourceId}, ${label}`)
        }}
      />
      <DropDownItem
        label="削除"
        handleClick={() => {
          console.log(`WIP delete id: ${resourceId}, ${label}`)
        }}
      />
    </DropDown>
  )
}

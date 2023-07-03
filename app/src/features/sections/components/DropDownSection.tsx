import { DropDown } from "@/components/DropDown"
import { DropDownItem } from "@/components/DropDown/DropDownItem"
import { Icon } from "@/components/Elements"

// TODO: resourceIdに変更してConfirmationDialogPropsにリファクタリングすること
interface ConfirmationDialogSectionProps {
  sectionId: string
  label: string
}

interface DropDownSectionProps {
  resourceId: string
  label: string
  editToggle: () => void
  deleteToggle: (props: ConfirmationDialogSectionProps) => void
}

export const DropDownSection = (methods: DropDownSectionProps): JSX.Element => {
  return (
    <DropDown trigger={<Icon variant="moreHoriz" bgColor="primary" />}>
      <DropDownItem
        label="編集"
        handleClick={() => {
          methods.editToggle()
        }}
      />
      <DropDownItem
        label="削除"
        handleClick={() => {
          methods.deleteToggle({
            sectionId: methods.resourceId,
            label: methods.label
          })
        }}
      />
    </DropDown>
  )
}

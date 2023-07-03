import { DropDown } from "@/components/DropDown"
import { DropDownItem } from "@/components/DropDown/DropDownItem"
import { Icon } from "@/components/Elements"

interface ConfirmationDialogSpaceProps {
  spaceId: string
  label: string
}

interface DropDownSpaceProps {
  resourceId: string
  label: string
  editToggle: () => void
  deleteToggle: (props: ConfirmationDialogSpaceProps) => void
}

export const DropDownSpace = (methods: DropDownSpaceProps): JSX.Element => {
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
            spaceId: methods.resourceId,
            label: methods.label
          })
        }}
      />
    </DropDown>
  )
}

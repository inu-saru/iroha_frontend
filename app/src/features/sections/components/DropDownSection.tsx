import { DropDown, DropDownItem, Icon } from "@/components/Elements"

// TODO: resourceIdに変更してConfirmationDialogPropsにリファクタリングすること
interface ConfirmationDialogSectionProps {
  sectionId: string
  label: string
}

interface DropDownSectionProps {
  resourceId?: string
  label?: string
  editToggle?: () => void
  deleteToggle: (props: ConfirmationDialogSectionProps) => void
}

export const DropDownSection = ({
  resourceId = "",
  label = "",
  editToggle = () => {},
  deleteToggle
}: DropDownSectionProps): JSX.Element => {
  return (
    <DropDown trigger={<Icon variant="moreHoriz" bgColor="primary" />}>
      <DropDownItem
        label="編集"
        handleClick={() => {
          editToggle()
        }}
      />
      <DropDownItem
        label="削除"
        handleClick={() => {
          deleteToggle({
            sectionId: resourceId,
            label
          })
        }}
      />
    </DropDown>
  )
}

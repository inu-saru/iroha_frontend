import { DropDown, DropDownItem, Icon } from "@/components/Elements"

// TODO: resourceIdに変更してConfirmationDialogPropsにリファクタリングすること
interface ConfirmationDialogSpaceProps {
  spaceId: string | undefined
  label: string | undefined
}

interface DropDownSpaceProps {
  resourceId?: string
  label?: string
  editToggle?: () => void
  deleteToggle: (props: ConfirmationDialogSpaceProps) => void
}

export const DropDownSpace = ({
  resourceId = "",
  label = "",
  editToggle = () => {},
  deleteToggle
}: DropDownSpaceProps): JSX.Element => {
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
            spaceId: resourceId,
            label
          })
        }}
      />
    </DropDown>
  )
}

import { DropDown, DropDownItem, Icon } from "@/components/Elements"

interface DropDownSpaceProps {
  editToggle?: () => void
  deleteToggle: () => void
}

export const DropDownSpace = ({
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
          deleteToggle()
        }}
      />
    </DropDown>
  )
}

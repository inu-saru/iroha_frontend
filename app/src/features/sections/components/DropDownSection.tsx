import { DropDown, DropDownItem, Icon } from "@/components/Elements"

interface DropDownSectionProps {
  editToggle?: () => void
  deleteToggle: () => void
}

export const DropDownSection = ({
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
          deleteToggle()
        }}
      />
    </DropDown>
  )
}

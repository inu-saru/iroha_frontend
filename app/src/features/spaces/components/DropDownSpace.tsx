import { DropDown, DropDownItem, Icon } from "@/components/Elements"
import { useNavigate } from "react-router-dom"
import { type Space } from "../types"

interface DropDownSpaceProps {
  space: Space
  deleteToggle: () => void
}

export const DropDownSpace = ({
  space,
  deleteToggle
}: DropDownSpaceProps): JSX.Element => {
  const navigate = useNavigate()

  return (
    <DropDown trigger={<Icon variant="moreHoriz" bgColor="primary" />}>
      <DropDownItem
        label="編集"
        handleClick={() => {
          navigate(`/app/spaces/${space.id}/edit`)
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

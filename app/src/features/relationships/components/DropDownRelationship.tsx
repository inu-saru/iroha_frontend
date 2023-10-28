import { DropDown, DropDownItem, Icon } from "@/components/Elements"
import { Relationship } from "../types"

interface DropDownRelationshipProps {
  resource: Relationship
  editToggle?: () => void
  deleteToggle?: (data: object) => void
}

export const DropDownRelationship = ({
  resource,
  editToggle = () => {},
  deleteToggle = () => {}
}: DropDownRelationshipProps): JSX.Element => {
  return (
    <DropDown trigger={<Icon variant="moreHoriz" bgColor="white" />}>
      <DropDownItem
        label="関連語の編集"
        handleClick={() => {
          editToggle()
        }}
      />
      <DropDownItem
        label="関連語から削除"
        handleClick={() => {
          deleteToggle({
            label: resource.en,
            relationshipId: resource.relationship_id
          })
        }}
      />
    </DropDown>
  )
}

import { DropDown, DropDownItem, Icon } from "@/components/Elements"

interface ConfirmationDialogRelationshipProps {
  relationshipId: string
  label: string
}

interface DropDownRelationshipProps {
  resourceId?: string
  label?: string
  editToggle?: () => void
}

export const DropDownRelationship = ({
  resourceId = "",
  label = "",
  editToggle = () => {}
}: DropDownRelationshipProps): JSX.Element => {
  return (
    <DropDown trigger={<Icon variant="moreHoriz" bgColor="white" />}>
      <DropDownItem
        label="関連語の編集"
        handleClick={() => {
          editToggle()
        }}
      />
      <DropDownItem label="関連語から削除" />
    </DropDown>
  )
}

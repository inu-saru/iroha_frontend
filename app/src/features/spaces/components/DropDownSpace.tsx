import { DropDown } from "@/components/DropDown"
import { DropDownItem } from "@/components/DropDown/DropDownItem"
import { Icon } from "@/components/Elements"
import { useDeleteSpace } from "../api/deleteSpace"

interface DropDownSpaceProps {
  resourceId: string
  editToggle: () => void
}

export const DropDownSpace = (methods: DropDownSpaceProps): JSX.Element => {
  const deleteSpaceMutation = useDeleteSpace({})

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
        handleClick={async () =>
          await deleteSpaceMutation.mutateAsync({ spaceId: methods.resourceId })
        }
      />
    </DropDown>
  )
}

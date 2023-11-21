import { Button } from "@/components/Elements"
import { ConfirmationDialog } from "@/components/Dialog"

import { useDeleteSection } from "../api/deleteSection"
import { type Section } from "../types"
import { useUrlParams } from "@/lib/useUrlParams"

interface DialogSectionDeleteProps {
  resource: Section
  isOpen: boolean
  close: () => void
}

export const DialogSectionDelete = ({
  resource,
  isOpen,
  close
}: DialogSectionDeleteProps): JSX.Element => {
  const { spaceId, config } = useUrlParams()
  const deleteSectionMutation = useDeleteSection({
    spaceId,
    config
  })

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      close={close}
      confirmButton={
        <Button
          onClick={async () => {
            await deleteSectionMutation.mutateAsync({
              sectionId: resource.id
            })
            close()
          }}
        >
          削除
        </Button>
      }
      title={"セクションの削除"}
      body={`${resource.name}を削除しますか？`}
    />
  )
}

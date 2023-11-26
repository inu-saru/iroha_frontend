import { Button } from "@/components/Elements"
import { ConfirmationDialog } from "@/components/Dialog"

import { useDeleteSpace } from "../api/deleteSpace"
import { type Space } from "../types"

interface DialogSpaceDeleteProps {
  resource: Space
  isOpen: boolean
  close: () => void
}

export const DialogSpaceDelete = ({
  resource,
  isOpen,
  close
}: DialogSpaceDeleteProps): JSX.Element => {
  const deleteSpaceMutation = useDeleteSpace()

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      close={close}
      confirmButton={
        <Button
          onClick={async () => {
            await deleteSpaceMutation.mutateAsync({
              spaceId: resource.id
            })
            close()
          }}
        >
          削除
        </Button>
      }
      title={"スペースの削除"}
      body={`${resource.name}を削除しますか？`}
    />
  )
}

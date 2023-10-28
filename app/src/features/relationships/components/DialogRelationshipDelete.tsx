import { ConfirmationDialog } from "@/components/Dialog"
import { Button } from "@/components/Elements"
import { useUrlParams } from "@/lib/useUrlParams"

import { useDeleteRelationship } from "../api/deleteRelationship"

interface DialogRelationshipDeleteProps {
  isOpen: boolean
  targetData: any
  close: () => void
}

export const DialogRelationshipDelete = ({
  isOpen,
  close,
  targetData
}: DialogRelationshipDeleteProps): JSX.Element => {
  const { spaceId, vocabularyId, config } = useUrlParams()
  const deleteRelationshipMutation = useDeleteRelationship({
    spaceId,
    vocabularyId,
    config
  })

  return (
    <>
      <ConfirmationDialog
        isOpen={isOpen}
        close={close}
        confirmButton={
          <Button
            onClick={async () => {
              close()
              await deleteRelationshipMutation.mutateAsync({
                relationshipId: targetData.relationshipId
              })
            }}
          >
            削除
          </Button>
        }
        title={"関連語からの削除"}
        body={`${targetData?.label}を関連語から削除しますか？`}
      />
    </>
  )
}

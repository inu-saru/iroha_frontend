import { type UseMutationResult } from "@tanstack/react-query"
import { type AxiosError } from "axios"

import { Button } from "@/components/Elements"
import { ConfirmationDialog } from "@/components/Dialog"

interface ConfirmationDialogSpaceProps {
  deleteSpaceMutation: UseMutationResult<
    any,
    AxiosError<unknown, any>,
    any,
    unknown
  >
  resourceId: number
  label: string
  isOpen: boolean
  close: () => void
}

export const ConfirmationDialogSpace = ({
  resourceId,
  label,
  deleteSpaceMutation,
  isOpen,
  close
}: ConfirmationDialogSpaceProps): JSX.Element => {
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      close={close}
      confirmButton={
        <Button
          onClick={async () => {
            await deleteSpaceMutation.mutateAsync({
              spaceId: resourceId
            })
            close()
          }}
        >
          削除
        </Button>
      }
      title={"スペースの削除"}
      body={`${label}を削除しますか？`}
    />
  )
}

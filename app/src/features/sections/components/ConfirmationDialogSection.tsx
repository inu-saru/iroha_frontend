import { type UseMutationResult } from "@tanstack/react-query"
import { type AxiosError } from "axios"

import { Button } from "@/components/Elements"
import { ConfirmationDialog } from "@/components/Dialog"

interface ConfirmationDialogSectionProps {
  deleteSectionMutation: UseMutationResult<
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

export const ConfirmationDialogSection = ({
  resourceId,
  label,
  deleteSectionMutation,
  isOpen,
  close
}: ConfirmationDialogSectionProps): JSX.Element => {
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      close={close}
      confirmButton={
        <Button
          onClick={async () => {
            await deleteSectionMutation.mutateAsync({
              sectionId: resourceId
            })
            close()
          }}
        >
          削除
        </Button>
      }
      title={"セクションの削除"}
      body={`${label}を削除しますか？`}
    />
  )
}

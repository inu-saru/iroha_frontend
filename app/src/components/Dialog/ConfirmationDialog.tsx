import * as React from "react"

import { Button } from "@/components/Elements"
import { Dialog, DialogTitle } from "./Dialog"

export interface ConfirmationDialogProps {
  isOpen: boolean
  close: () => void
  confirmButton: React.ReactElement
  title: string
  body?: string
  cancelButtonText?: string
  isDone?: boolean
}

export const ConfirmationDialog = ({
  isOpen,
  close,
  confirmButton,
  title,
  body = "",
  cancelButtonText = "キャンセル",
  isDone = false
}: ConfirmationDialogProps): JSX.Element => {
  const cancelButtonRef = React.useRef(null)

  React.useEffect(() => {
    if (isDone) {
      close()
    }
  }, [isDone, close])

  return (
    <>
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="z-10 inline-block bg-white rounded-md m-8 px-8 py-4 text-left overflow-hidden shadow-xl transform transition-all align-middle">
          <div>
            <DialogTitle
              as="h3"
              className="text-h200 text-natural-300 border-b block pb-3 mb-4"
            >
              {title}
            </DialogTitle>
            {body !== "" && (
              <div>
                <p className="text-sm text-natural-900 break-words">{body}</p>
              </div>
            )}
          </div>

          <div className="mt-4 ml-16 flex space-x-4 justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={close}
              ref={cancelButtonRef}
            >
              {cancelButtonText}
            </Button>
            {confirmButton}
          </div>
        </div>
      </Dialog>
    </>
  )
}

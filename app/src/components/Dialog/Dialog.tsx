import { Dialog as UIDialog, Transition } from "@headlessui/react"
import * as React from "react"

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  initialFocus?: React.MutableRefObject<null>
}

export const DialogTitle = UIDialog.Title

export const DialogDescription = UIDialog.Description

export const Dialog = ({
  isOpen,
  onClose,
  children,
  initialFocus
}: DialogProps): JSX.Element => {
  return (
    <>
      <Transition.Root show={isOpen} as={React.Fragment}>
        <UIDialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={isOpen}
          onClose={onClose}
          initialFocus={initialFocus}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <UIDialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {children}
          </div>
        </UIDialog>
      </Transition.Root>
    </>
  )
}

import React from "react"
import { Spinner } from "../Elements"

interface ContentElementProps {
  resourceId: string | undefined
  resourceName: string | undefined
  isLoading: boolean
  dropDown?: JSX.Element | undefined
  children?: React.ReactNode | undefined
}

export const ContentElement = ({
  resourceId,
  resourceName,
  isLoading,
  dropDown = undefined,
  children
}: ContentElementProps): JSX.Element => {

  if (isLoading) {
    return (
      <div className="py-4 w-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  const dropDownWithResourceId =
    dropDown !== undefined
      ? React.cloneElement(dropDown, {
          resourceId,
          label: resourceName
        })
      : undefined

  return (
    <>
      <div className="bg-white p-8 border-b border-natural-40 relative group break-words">
        {dropDown !== undefined && (
          <div className="absolute w-max inset-y-0 right-8 top-8 h-6 opacity-0 invisible group-hover:visible opacity-100">
            {dropDownWithResourceId}
          </div>
        )}
        {children}
      </div>
    </>
  )
}

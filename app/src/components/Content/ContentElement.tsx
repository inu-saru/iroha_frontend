import React from "react"
import { Spinner } from "../Elements"

interface ContentElementProps {
  resourceId: string | undefined
  original: string | undefined
  translation: string | undefined
  isLoading: boolean
  dropDown?: JSX.Element | undefined
}

export const ContentElement = ({
  resourceId,
  original,
  translation,
  isLoading,
  dropDown = undefined
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
          label: original
        })
      : undefined

  return (
    <>
      <div className="bg-white p-8 border-b border-natural-40 relative group break-words">
        <div className="mb-4 text-h400">{original}</div>
        <div className="ext-middle text-natural-700">{translation}</div>
        {dropDown !== undefined && (
          <div className="absolute w-max inset-y-0 right-8 top-8 h-6 opacity-0 invisible group-hover:visible opacity-100">
            {dropDownWithResourceId}
          </div>
        )}
      </div>
    </>
  )
}

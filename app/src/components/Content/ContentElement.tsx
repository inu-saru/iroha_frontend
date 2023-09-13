import React from "react"
import { Spinner } from "../Elements"
import { type Vocabulary } from "@/features/vocabularies/types"

interface ContentElementProps {
  resourceData: Vocabulary
  isLoading: boolean
  dropDown?: JSX.Element | undefined
}

export const ContentElement = ({
  resourceData,
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
          resourceId: resourceData?.id,
          label: resourceData?.en
        })
      : undefined

  return (
    <>
      <div className="bg-white p-8 border-b border-natural-40 relative group break-words">
        <div className="mb-4 text-h400">{resourceData?.en}</div>
        <div className="ext-middle text-natural-700">{resourceData?.ja}</div>
        {dropDown !== undefined && (
          <div className="absolute w-max inset-y-0 right-8 top-8 h-6 opacity-0 invisible group-hover:visible opacity-100">
            {dropDownWithResourceId}
          </div>
        )}
      </div>
    </>
  )
}

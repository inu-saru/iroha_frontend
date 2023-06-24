import { type UseQueryResult } from "@tanstack/react-query"
import React from "react"
import { Spinner } from "../Elements"

interface ContentElementProps {
  resourceQuery: UseQueryResult
  dropDown?: JSX.Element | undefined
}

export const ContentElement = ({
  resourceQuery,
  dropDown = undefined
}: ContentElementProps): JSX.Element => {
  if (resourceQuery.isLoading) {
    return (
      <div className="py-4 w-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  const dropDownWithResourceId =
    dropDown !== undefined
      ? React.cloneElement(dropDown, {
          resourceId: resourceQuery.data?.id,
          label: resourceQuery.data?.en
        })
      : undefined

  return (
    <>
      <div className="bg-white p-8 border-b border-natural-40 relative group">
        <div className="mb-4">{resourceQuery.data?.en}</div>
        <div>{resourceQuery.data?.ja}</div>
        {dropDown !== undefined && (
          <div className="absolute w-max inset-y-0 right-8 top-8 h-6 opacity-0 invisible group-hover:visible opacity-100">
            {dropDownWithResourceId}
          </div>
        )}
      </div>
    </>
  )
}

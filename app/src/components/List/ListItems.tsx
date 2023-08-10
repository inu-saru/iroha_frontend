import { type UseInfiniteQueryResult } from "@tanstack/react-query"

import { Spinner } from "@/components/Elements"
import { ListItem } from "./ListItem"
import { ListFooter } from "./ListFooter"
import { type PagenateResponse } from "@/lib/react-query"
import React from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

interface NavItemsProps {
  resourcesQuery: UseInfiniteQueryResult<PagenateResponse, unknown>
  resourcesUrl: (resourceId: string) => string
}

export const ListItems = ({
  resourcesQuery,
  resourcesUrl
}: NavItemsProps): JSX.Element => {
  const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null)
  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: resourcesQuery.fetchNextPage,
    enabled: resourcesQuery.hasNextPage
  })

  if (resourcesQuery.isLoading) {
    return (
      <div className="py-4 w-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  if (!resourcesQuery?.data?.pages[0].resources.length) {
    return (
      <div className="text-h300 flex justify-center items-center flex-col">
        <p>{`No Resource Found`}</p>
      </div>
    )
  }

  return (
    <>
      <ul>
        {resourcesQuery.data?.pages.map((page) =>
          page.resources.map((resource, index) => (
            <div key={index}>
              <ListItem resource={resource} to={resourcesUrl(resource.id)} />
            </div>
          ))
        )}
      </ul>
      {/* FIXME: 初回レンダリング時にbuttonのrefが取得できないためinfinite scrollが反応しない。show allボタンを設置しているが理想はボタンが不要にしたい */}
      {resourcesQuery.hasNextPage && (
        <div>
          {!resourcesQuery.isFetchingNextPage && (
            <button
              className="block mx-auto -mt-3 px-2 py-1 text-small border border-solid border-natural-50 rounded-xl bg-white hover:bg-primary-20"
              ref={loadMoreButtonRef}
              onClick={async () => await resourcesQuery.fetchNextPage()}
            >
              Show all
            </button>
          )}
        </div>
      )}
      <ListFooter count={`${resourcesQuery.data?.pages[0].totalCount}`} />
    </>
  )
}

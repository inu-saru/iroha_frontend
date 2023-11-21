import { type UseInfiniteQueryResult } from "@tanstack/react-query"

import { Spinner } from "@/components/Elements"
import { type PagenateResponse } from "@/lib/react-query"
import React from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

interface NavItemsProps {
  resourcesQuery: UseInfiniteQueryResult<PagenateResponse, unknown>
  navItem: React.ReactElement
}

export const NavItems = ({
  resourcesQuery,
  navItem
}: NavItemsProps): JSX.Element => {
  const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null)
  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: resourcesQuery.fetchNextPage,
    enabled: resourcesQuery.hasNextPage
  })

  const navItemWith = ({ resource }: any): React.ReactElement => {
    return React.cloneElement(navItem, resource)
  }

  if (resourcesQuery.isLoading) {
    return (
      <div className="py-4 w-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <ul>
        {resourcesQuery.data?.pages.map((page) =>
          page.resources.map((resource, index) => (
            <div key={index}>
              {navItemWith({
                resource
              })}
            </div>
          ))
        )}
      </ul>
      {/* FIXME: 初回レンダリング時にbuttonのrefが取得できないためinfinite scrollが反応しない。show allボタンを設置しているが理想はボタンが不要にしたい */}
      {resourcesQuery.hasNextPage && (
        <div>
          {!resourcesQuery.isFetchingNextPage && (
            <button
              className="block mx-auto relative -mt-3 -mb-3 px-2 py-1 text-small border border-solid border-natural-50 rounded-xl bg-white hover:bg-primary-20"
              ref={loadMoreButtonRef}
              onClick={async () => await resourcesQuery.fetchNextPage()}
            >
              show all
            </button>
          )}
        </div>
      )}
    </>
  )
}

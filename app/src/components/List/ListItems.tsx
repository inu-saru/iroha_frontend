import { type UseInfiniteQueryResult } from "@tanstack/react-query"

import { Spinner } from "@/components/Elements"
import { ListItem } from "./ListItem"
import { ListFooter } from "./ListFooter"
import { type PagenateResponse } from "@/lib/react-query"

interface NavItemsProps {
  resourcesQuery: UseInfiniteQueryResult<PagenateResponse, unknown>
  resourcesUrl: (resourceId: string) => string
}

export const ListItems = ({
  resourcesQuery,
  resourcesUrl
}: NavItemsProps): JSX.Element => {
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
      {/* TODO: WIP scrollで発火するように変更する */}
      {resourcesQuery.hasNextPage && (
        <button onClick={async () => await resourcesQuery.fetchNextPage()}>
          {resourcesQuery.isFetchingNextPage ? "isLoading..." : "Load"}
        </button>
      )}
      <ListFooter count={`${resourcesQuery.data?.pages[0].totalCount}`} />
    </>
  )
}

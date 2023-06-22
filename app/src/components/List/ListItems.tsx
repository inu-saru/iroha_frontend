import { type UseQueryResult } from "@tanstack/react-query"

import { Spinner } from "@/components/Elements"
import { ListItem } from "./ListItem"
import { ListFooter } from "./ListFooter"

interface NavItemsProps {
  resourcesQuery: UseQueryResult
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

  if (!resourcesQuery?.data?.length) {
    return (
      <div className="text-h300 flex justify-center items-center flex-col">
        <p>{`No Resource Found`}</p>
      </div>
    )
  }

  return (
    <>
      <div className="h-screen bg-white">
        <ul>
          {resourcesQuery.data.map((resource, index) => (
            <div key={index}>
              <ListItem resource={resource} to={resourcesUrl(resource.id)} />
            </div>
          ))}
        </ul>
        <ListFooter count={`${resourcesQuery.data.length}`} />
      </div>
    </>
  )
}

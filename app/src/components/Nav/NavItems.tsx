import { type Schema } from "zod"

import {
  type UseMutationResult,
  type UseQueryResult
} from "@tanstack/react-query"

import { Spinner } from "@/components/Elements"
import { NavItem, NavItemUpdate, NavItemSwitch } from "@/components/Nav"

interface NavItemsProps {
  resourcesQuery: UseQueryResult
  schema?: Schema
  updateResourceQuery: UseMutationResult
  resourcesUrl: string
  icon?: string
  dropDown?: JSX.Element
  swichedElementRef: any
}

export const NavItems = ({
  resourcesQuery,
  schema,
  updateResourceQuery,
  resourcesUrl,
  icon,
  dropDown
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
        <p>{`No ${resourcesUrl} Found`}</p>
      </div>
    )
  }

  return (
    <ul>
      {resourcesQuery.data.map((resource, index) => (
        <div key={index}>
          <NavItemSwitch dropDown={dropDown}>
            {(methods) => (
              <>
                {methods.isSwitched ? (
                  <div ref={methods.ref}>
                    <NavItemUpdate
                      schema={schema}
                      resourceId={resource.id}
                      defaultValue={resource.name}
                      actionResource={updateResourceQuery}
                      toggle={methods.toggle}
                    />
                  </div>
                ) : (
                  <NavItem
                    resourceId={resource.id}
                    to={`./${resourcesUrl}/${resource.id}`}
                    icon={icon}
                    label={resource.name}
                    dropDown={methods.dropDownWitoEditToggle}
                  />
                )}
              </>
            )}
          </NavItemSwitch>
        </div>
      ))}
    </ul>
  )
}

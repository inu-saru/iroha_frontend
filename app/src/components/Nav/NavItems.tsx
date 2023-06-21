import React from "react"
import { type UseQueryResult } from "@tanstack/react-query"

import { Spinner } from "@/components/Elements"
import {
  NavItem,
  NavItemSwitch,
  type NavitemUpadteResourceDataProps
} from "@/components/Nav"

interface NavItemsProps {
  resourcesQuery: UseQueryResult
  navItemUpdate: React.ReactElement
  resourcesUrl: (resourceId: string) => string
  icon?: string
  dropDown?: JSX.Element
}

export const NavItems = ({
  resourcesQuery,
  navItemUpdate,
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
        <p>{`No Resource Found`}</p>
      </div>
    )
  }

  const navItemUpdateWith = ({
    resourceId,
    defaultValue,
    toggle
  }: NavitemUpadteResourceDataProps): React.ReactElement => {
    return React.cloneElement(navItemUpdate, {
      resourceId,
      defaultValue,
      toggle
    })
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
                    {navItemUpdateWith({
                      resourceId: resource.id,
                      defaultValue: resource.name,
                      toggle: methods.toggle
                    })}
                  </div>
                ) : (
                  <NavItem
                    resourceId={resource.id}
                    to={resourcesUrl(resource.id)}
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

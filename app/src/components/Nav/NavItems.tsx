import React from "react"
import { type UseQueryResult } from "@tanstack/react-query"

import {
  type IconVariant,
  Spinner,
  SwitcherDisplay
} from "@/components/Elements"
import { NavItem, type NavitemUpadteResourceDataProps } from "@/components/Nav"

interface NavItemsProps {
  activeResourceId?: string | null
  resourcesQuery: UseQueryResult<any[], unknown>
  navItemUpdate: React.ReactElement
  resourcesUrl: (resourceId: string) => string
  icon?: IconVariant
  dropDown?: JSX.Element
}

export const NavItems = ({
  activeResourceId,
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

  interface dropDownWitoEditToggleProps {
    dropDown: JSX.Element | undefined
    toggle: () => void
  }

  const dropDownWitoEditToggle = ({
    dropDown,
    toggle
  }: dropDownWitoEditToggleProps): React.ReactElement | undefined => {
    return dropDown != null
      ? React.cloneElement(dropDown, { editToggle: toggle })
      : undefined
  }

  return (
    <ul>
      {resourcesQuery.data.map((resource, index) => (
        <div key={index}>
          <SwitcherDisplay>
            {(methods) => (
              <>
                {methods.isOpen ? (
                  <div ref={methods.clickAway}>
                    {navItemUpdateWith({
                      resourceId: resource.id,
                      defaultValue: resource.name,
                      toggle: methods.toggle
                    })}
                  </div>
                ) : (
                  <NavItem
                    resourceId={resource.id}
                    isActive={activeResourceId === `${resource.id}`}
                    to={resourcesUrl(resource.id)}
                    icon={icon}
                    label={resource.name}
                    dropDown={dropDownWitoEditToggle({
                      dropDown,
                      toggle: methods.toggle
                    })}
                  />
                )}
              </>
            )}
          </SwitcherDisplay>
        </div>
      ))}
    </ul>
  )
}

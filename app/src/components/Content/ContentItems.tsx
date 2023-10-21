import { type UseInfiniteQueryResult } from "@tanstack/react-query"

import { Spinner, SwitcherDisplay } from "@/components/Elements"
import { ContentItem } from "./ContentItem"
import { type PagenateResponse } from "@/lib/react-query"
import React from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

interface dropDownWithEditToggleProps {
  dropDown: JSX.Element | undefined
  toggle: () => void
}

const dropDownWithEditToggle = ({
  dropDown,
  toggle
}: dropDownWithEditToggleProps): React.ReactElement | undefined => {
  return dropDown != null
    ? React.cloneElement(dropDown, { editToggle: toggle })
    : undefined
}

interface ContentItemsProps {
  resourcesQuery: UseInfiniteQueryResult<PagenateResponse, unknown>
  contentItemUpdate: React.ReactElement
  dropDown?: JSX.Element
}

export const ContentItems = ({
  resourcesQuery,
  contentItemUpdate,
  dropDown
}: ContentItemsProps): JSX.Element => {
  const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null)
  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: resourcesQuery.fetchNextPage,
    enabled: resourcesQuery.hasNextPage
  })

  const contentItemUpdateWith = ({
    resource,
    toggle
  }: any): React.ReactElement => {
    return React.cloneElement(contentItemUpdate, {
      resource,
      toggle
    })
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
              <SwitcherDisplay>
                {(methods) => (
                  <>
                    {methods.isOpen ? (
                      <div>
                        {contentItemUpdateWith({
                          resource,
                          toggle: methods.toggle
                        })}
                      </div>
                    ) : (
                      <ContentItem
                        resourceId={resource.id}
                        original={resource.en}
                        translation={resource.ja}
                        dropDown={dropDownWithEditToggle({
                          dropDown,
                          toggle: methods.toggle
                        })}
                      />
                    )}
                  </>
                )}
              </SwitcherDisplay>
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
              Show all
            </button>
          )}
        </div>
      )}
    </>
  )
}

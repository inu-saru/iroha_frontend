import { z } from "zod"

import {
  Button,
  Icon,
  SwitcherDialog,
  SwitcherDisplay
} from "@/components/Elements"
import { NavHeader, NavItems, NavItemUpdate } from "@/components/Nav"
import { NavItemCreateSection } from "./NavItemCreateSection"

import { useSections } from "../api/getSections"
import { DropDownSection } from "./DropDownSection"
import { useCreateSection } from "../api/createSection"
import { useUpdateSection } from "../api/updateSection"
import { ConfirmationDialog } from "@/components/ConfirmationDialog"
import { useDeleteSection } from "../api/deleteSection"
import { useSearchParams } from "react-router-dom"

const schema = z.object({
  name: z.string().min(1, "Required")
})

interface SectionsProps {
  spaceId: string | undefined
}

export const Sections = ({ spaceId }: SectionsProps): JSX.Element => {
  const sectionsQuery = useSections({ spaceId })
  const createSectionMutation = useCreateSection({ spaceId })
  const updateSectionMutation = useUpdateSection({ spaceId })
  const deleteSectionMutation = useDeleteSection({ spaceId })

  const resourcesUrl = (resourceId: string): string => {
    return `/app/spaces/${spaceId}/vocabularies?sid=${resourceId}`
  }
  const [searchParams] = useSearchParams()
  const activeResourceId = searchParams.get("sid") ?? null

  return (
    <>
      <SwitcherDisplay>
        {(methods) => (
          <>
            <NavHeader title="セクション">
              <div onClick={methods.toggle}>
                <Icon variant="add" bgColor="white" />
              </div>
            </NavHeader>
            {methods.isOpen && (
              <div ref={methods.clickAway}>
                <NavItemCreateSection
                  createSectionMutation={createSectionMutation}
                  toggle={methods.toggle}
                />
              </div>
            )}
          </>
        )}
      </SwitcherDisplay>
      <SwitcherDialog>
        {(methods) => (
          <>
            <NavItems
              activeResourceId={activeResourceId}
              resourcesQuery={sectionsQuery}
              navItemUpdate={
                <NavItemUpdate
                  schema={schema}
                  maxLength={255}
                  updateResourceMutation={updateSectionMutation}
                />
              }
              resourcesUrl={resourcesUrl}
              icon="section"
              dropDown={<DropDownSection deleteToggle={methods.openWith} />}
            />
            <ConfirmationDialog
              isOpen={methods.isOpen}
              close={methods.closeWith}
              confirmButton={
                <Button
                  onClick={async () => {
                    await deleteSectionMutation.mutateAsync({
                      sectionId: methods.targetData.sectionId
                    })
                    methods.closeWith()
                  }}
                >
                  削除
                </Button>
              }
              title={"セクションの削除"}
              body={`${methods.targetData.label}を削除しますか？`}
            />
          </>
        )}
      </SwitcherDialog>
    </>
  )
}

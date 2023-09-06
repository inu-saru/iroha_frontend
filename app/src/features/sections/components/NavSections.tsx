import { Icon, SwitcherDialog, SwitcherDisplay } from "@/components/Elements"
import { NavHeader, NavItems } from "@/components/Nav"
import { NavItemCreateSection } from "./NavItemCreateSection"
import { NavItemUpdateSection } from "./NavItemUpdateSection"
import { ConfirmationDialogSection } from "./ConfirmationDialogSection"

import { useSections } from "../api/getSections"
import { DropDownSection } from "./DropDownSection"
import { useCreateSection } from "../api/createSection"
import { useUpdateSection } from "../api/updateSection"
import { useDeleteSection } from "../api/deleteSection"
import { useUrlParams } from "@/lib/useUrlParams"

export const NavSections = (): JSX.Element => {
  const { spaceId, searchParams } = useUrlParams()
  const sectionsQuery = useSections({ spaceId })
  const createSectionMutation = useCreateSection({ spaceId })
  const updateSectionMutation = useUpdateSection({ spaceId })
  const deleteSectionMutation = useDeleteSection({ spaceId })

  const resourcesUrl = (resourceId: string): string => {
    return `/app/spaces/${spaceId}/vocabularies?sid=${resourceId}`
  }
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
                <NavItemUpdateSection
                  updateSectionMutation={updateSectionMutation}
                />
              }
              resourcesUrl={resourcesUrl}
              icon="section"
              dropDown={<DropDownSection deleteToggle={methods.openWith} />}
            />
            <ConfirmationDialogSection
              resourceId={methods.targetData.sectionId}
              label={methods.targetData.label}
              deleteSectionMutation={deleteSectionMutation}
              isOpen={methods.isOpen}
              close={methods.closeWith}
            />
          </>
        )}
      </SwitcherDialog>
    </>
  )
}

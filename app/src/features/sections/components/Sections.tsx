import { useRef } from "react"
import { useClickAway, useToggle } from "react-use"
import { z } from "zod"

import { Button, Icon } from "@/components/Elements"
import {
  NavItemCreate,
  NavHeader,
  NavItems,
  NavItemUpdate
} from "@/components/Nav"

import { useSections } from "../api/getSections"
import { DropDownSection } from "./DropDownSection"
import { useCreateSection } from "../api/createSection"
import { useUpdateSection } from "../api/updateSection"
import { ConfirmationDialog } from "@/components/ConfirmationDialog"
import { useDisclosure } from "@/hooks/useDisclosure"
import { useDeleteSection } from "../api/deleteSection"

const schema = z.object({
  name: z.string().min(1, "Required")
})

export const Sections = (spaceId: object): JSX.Element => {
  const sectionsQuery = useSections(spaceId)
  const [isOpen, toggle] = useToggle(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    toggle()
  })

  const {
    targetData,
    openWith: openWithDelete,
    closeWith: closeWithDelete,
    isOpen: isOpenDelete
  } = useDisclosure()
  const createSectionMutation = useCreateSection(spaceId)
  const updateSectionMutation = useUpdateSection(spaceId)
  const deleteSectionMutation = useDeleteSection(spaceId)

  return (
    <>
      <NavHeader title="セクション">
        <div onClick={toggle}>
          <Icon variant="add" bgColor="white" />
        </div>
      </NavHeader>
      {isOpen && (
        <div ref={ref}>
          <NavItemCreate
            createResourceMutation={createSectionMutation}
            schema={schema}
            maxLength={255}
            placeholder="新しいセクション"
            toggle={toggle}
          />
        </div>
      )}
      <NavItems
        resourcesQuery={sectionsQuery}
        navItemUpdate={
          <NavItemUpdate
            schema={schema}
            maxLength={255}
            updateResourceMutation={updateSectionMutation}
          />
        }
        resourcesUrl={`/app/spaces/${spaceId.spaceId}/sections`}
        icon="section"
        dropDown={<DropDownSection deleteToggle={openWithDelete} />}
      />
      <ConfirmationDialog
        isOpen={isOpenDelete}
        close={closeWithDelete}
        confirmButton={
          <Button
            onClick={async () => {
              await deleteSectionMutation.mutateAsync({
                sectionId: targetData.sectionId
              })
              closeWithDelete()
            }}
          >
            削除
          </Button>
        }
        title={"セクションの削除"}
        body={`${targetData.label}を削除しますか？`}
      />
    </>
  )
}

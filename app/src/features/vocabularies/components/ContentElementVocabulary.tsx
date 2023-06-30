import { ConfirmationDialog } from "@/components/ConfirmationDialog"
import { ContentHeader } from "@/components/Content"
import { ContentElement } from "@/components/Content/ContentElement"
import { Button } from "@/components/Elements"
import { useDisclosure } from "@/hooks/useDisclosure"

import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useDeleteVocabulary } from "../api/deleteVocabulary"
import { useVocabulary } from "../api/getVocabulary"
import { DropDownVocabulary } from "./DropDownVocabulary"

export const ContentElementVocabulary = (): JSX.Element => {
  const { spaceId, vocabularyId } = useParams<{
    spaceId: string
    vocabularyId: string
  }>()
  const [searchParams] = useSearchParams()
  const entries = Array.from(searchParams.entries())
  const config = {}
  for (const [key, value] of entries) {
    config[key] = value
  }
  const vocabularyQuery = useVocabulary({ spaceId, vocabularyId })
  const navigate = useNavigate()

  const {
    targetData,
    openWith: openWithDelete,
    closeWith: closeWithDelete,
    isOpen: isOpenDelete
  } = useDisclosure()

  const deleteVocabularyMutation = useDeleteVocabulary({ config, spaceId })

  return (
    <>
      <ContentHeader
        to={`/app/spaces/${spaceId}/vocabularies?${searchParams.toString()}`}
      />
      <ContentElement
        resourceQuery={vocabularyQuery}
        dropDown={<DropDownVocabulary deleteToggle={openWithDelete} />}
      />
      <ConfirmationDialog
        isOpen={isOpenDelete}
        close={closeWithDelete}
        confirmButton={
          <Button
            onClick={async () => {
              await deleteVocabularyMutation.mutateAsync({
                vocabularyId: targetData.vocabularyId
              })
              closeWithDelete()
              navigate(
                `/app/spaces/${spaceId}/vocabularies?${searchParams.toString()}`
              )
            }}
          >
            削除
          </Button>
        }
        title={"ボキャブラリーの削除"}
        body={`${targetData.label}を削除しますか？`}
      />
    </>
  )
}

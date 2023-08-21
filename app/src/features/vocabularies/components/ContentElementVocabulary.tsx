import { ConfirmationDialog } from "@/components/Dialog"
import { ContentHeader } from "@/components/Content"
import { ContentElement } from "@/components/Content/ContentElement"
import { Button, SwitcherDialog } from "@/components/Elements"

import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useDeleteVocabulary } from "../api/deleteVocabulary"
import { useVocabulary } from "../api/getVocabulary"
import { DropDownVocabulary } from "./DropDownVocabulary"
import { type SearchParams } from "@/types"

export const ContentElementVocabulary = (): JSX.Element => {
  const { spaceId, vocabularyId } = useParams<{
    spaceId: string
    vocabularyId: string
  }>()
  const [searchParams] = useSearchParams()
  const entries = Array.from(searchParams.entries())
  const config: SearchParams = {}
  for (const [key, value] of entries) {
    config[key] = value
  }
  const navigate = useNavigate()
  const vocabularyQuery = useVocabulary({ spaceId, vocabularyId })
  const deleteVocabularyMutation = useDeleteVocabulary({ config, spaceId })

  return (
    <>
      <ContentHeader
        to={`/app/spaces/${spaceId}/vocabularies?${searchParams.toString()}`}
      />
      <SwitcherDialog>
        {(methods) => (
          <>
            <ContentElement
              resourceQuery={vocabularyQuery}
              dropDown={<DropDownVocabulary deleteToggle={methods.openWith} />}
            />
            <ConfirmationDialog
              isOpen={methods.isOpen}
              close={methods.closeWith}
              confirmButton={
                <Button
                  onClick={async () => {
                    await deleteVocabularyMutation.mutateAsync({
                      vocabularyId: methods.targetData.vocabularyId
                    })
                    methods.closeWith()
                    navigate(
                      `/app/spaces/${spaceId}/vocabularies?${searchParams.toString()}`
                    )
                  }}
                >
                  削除
                </Button>
              }
              title={"ボキャブラリーの削除"}
              body={`${methods.targetData.label}を削除しますか？`}
            />
          </>
        )}
      </SwitcherDialog>
    </>
  )
}

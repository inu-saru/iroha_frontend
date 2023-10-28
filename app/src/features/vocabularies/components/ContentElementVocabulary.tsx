import { useNavigate } from "react-router-dom"

import { ConfirmationDialog } from "@/components/Dialog"
import { ContentElement } from "@/components/Content/ContentElement"
import { Button, SwitcherDialog } from "@/components/Elements"

import { useDeleteVocabulary } from "../api/deleteVocabulary"
import { useVocabulary } from "../api/getVocabulary"
import { DropDownVocabulary } from "./DropDownVocabulary"
import { useUrlParams } from "@/lib/useUrlParams"

export const ContentElementVocabulary = (): JSX.Element => {
  const { spaceId, vocabularyId, searchParams, config } = useUrlParams()
  const vocabularyQuery = useVocabulary({ spaceId, vocabularyId })
  const deleteVocabularyMutation = useDeleteVocabulary({ config, spaceId })
  const navigate = useNavigate()

  return (
    <>
      <SwitcherDialog>
        {(methods) => (
          <>
            <ContentElement
              resourceId={vocabularyQuery.data?.id}
              original={vocabularyQuery.data?.en}
              translation={vocabularyQuery.data?.ja}
              isLoading={vocabularyQuery.isLoading}
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

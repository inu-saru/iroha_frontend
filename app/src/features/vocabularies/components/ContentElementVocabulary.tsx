import { useNavigate } from "react-router-dom"

import { ConfirmationDialog } from "@/components/Dialog"
import { ContentElement } from "@/components/Content/ContentElement"
import { Button, SwitcherDialog, TextToSpeechButton, SpeechToTextButton, RecordingPlayer, Icon } from "@/components/Elements"

import { useDeleteVocabulary } from "../api/deleteVocabulary"
import { useVocabulary } from "../api/getVocabulary"
import { DropDownVocabulary } from "./DropDownVocabulary"
import { useUrlParams } from "@/lib/useUrlParams"

import React, { useState } from "react"

export const ContentElementVocabulary = ({ updateVocabularyType }:any): JSX.Element => {
  const { spaceId, vocabularyId, searchParams, config } = useUrlParams()
  const vocabularyQuery = useVocabulary({ spaceId, vocabularyId })
  const deleteVocabularyMutation = useDeleteVocabulary({ config, spaceId })
  const navigate = useNavigate()

  React.useEffect(() => {
    updateVocabularyType(vocabularyQuery.data?.vocabulary_type)
  }, [vocabularyQuery]);

  const [transcript, setTranscript] = useState<string>('')
  const [recognitionStatus, setRecognitionStatus] = useState<boolean>(false)
  const [recordingStatus, setRecordingStatus] = useState<string>('idle')
  const speechToTextButtonRef = React.createRef<typeof SpeechToTextButton>()
  const handleResetTranscript = (): void => {
    speechToTextButtonRef.current?.handleResetTranscript()
  }

  React.useEffect(() => {
    handleResetTranscript()
  }, [vocabularyQuery.data?.en])

  return (
    <>
      <SwitcherDialog>
        {(methods) => (
          <>
            <ContentElement
              resourceId={vocabularyQuery.data?.id}
              resourceName={vocabularyQuery.data?.en}
              isLoading={vocabularyQuery.isLoading}
              dropDown={<DropDownVocabulary deleteToggle={methods.openWith} />}
            >
              <div className="mb-4 text-h400">{vocabularyQuery.data?.en}</div>
              <div className="ext-middle text-natural-700">{vocabularyQuery.data?.ja}</div>

              <div className="mt-4 -mb-4 flex gap-2">
                <TextToSpeechButton text={vocabularyQuery.data?.en}  />
                <SpeechToTextButton setTranscript={setTranscript} setRecognitionStatus={setRecognitionStatus} recordingStatus={recordingStatus} ref={speechToTextButtonRef} />
              </div>
              <div className={transcript === '' ? 'hidden' : 'block'}>
                <div className="flex gap-4 items-center mt-4">
                  <p className="block w-full text-default mt-2 px-4 py-3 text-natural-900 border border-natural-40 bg-white focus:ring-primary-100 focus:border-primary-100">
                    {transcript}
                  </p>
                  <div onClick={handleResetTranscript}>
                    <Icon bgColor="white" variant="close" />
                  </div>
                </div>
                <RecordingPlayer setRecordingStatus={setRecordingStatus} recognitionStatus={recognitionStatus} />
              </div>
            </ContentElement>

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

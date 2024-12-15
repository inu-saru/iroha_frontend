import React, { useState } from "react"
import { Spinner, TextToSpeechButton, SpeechToTextButton, RecordingPlayer, Icon } from "../Elements"

interface ContentElementProps {
  resourceId: string | undefined
  original: string | undefined
  translation: string | undefined
  isLoading: boolean
  dropDown?: JSX.Element | undefined
}

export const ContentElement = ({
  resourceId,
  original,
  translation,
  isLoading,
  dropDown = undefined
}: ContentElementProps): JSX.Element => {
  const [transcript, setTranscript] = useState<string>('')
  const [recognitionStatus, setRecognitionStatus] = useState<boolean>(false)
  const [recordingStatus, setRecordingStatus] = useState<string>('idle')
  const speechToTextButtonRef = React.createRef<typeof SpeechToTextButton>()
  const handleResetTranscript = (): void => {
    speechToTextButtonRef.current?.handleResetTranscript()
  }

  React.useEffect(() => {
    handleResetTranscript()
  }, [original])

  if (isLoading) {
    return (
      <div className="py-4 w-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  const dropDownWithResourceId =
    dropDown !== undefined
      ? React.cloneElement(dropDown, {
          resourceId,
          label: original
        })
      : undefined

  return (
    <>
      <div className="bg-white p-8 border-b border-natural-40 relative group break-words">
        <div className="mb-4 text-h400">{original}</div>
        <div className="ext-middle text-natural-700">{translation}</div>
        {dropDown !== undefined && (
          <div className="absolute w-max inset-y-0 right-8 top-8 h-6 opacity-0 invisible group-hover:visible opacity-100">
            {dropDownWithResourceId}
          </div>
        )}
        <div className="mt-4 -mb-4 flex gap-2">
          <TextToSpeechButton text={original}  />
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
      </div>
    </>
  )
}

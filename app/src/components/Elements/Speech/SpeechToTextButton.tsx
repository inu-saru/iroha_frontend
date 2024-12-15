import React, { type Ref, forwardRef, useImperativeHandle } from 'react';
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Icon } from "../Icon"
import { IconButton } from "../Button"

interface SpeechToTextButtonProps {
  setTranscript: (value: string) => void;
  setRecognitionStatus: (value: boolean) => void;
  recordingStatus: string
}

interface SpeechToTextButtonBaseRef {
  handleResetTranscript: () => void
}

const startRecognition = (): void => {
  void SpeechRecognition.startListening({ language: 'en-US' })
}

const SpeechToTextButtonBase = ({setTranscript, setRecognitionStatus, recordingStatus}: SpeechToTextButtonProps, ref:Ref<typeof SpeechToTextButton>): JSX.Element => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  React.useEffect(() => {
    setTranscript(transcript)
  }, [transcript])

  React.useEffect(() => {  
    setRecognitionStatus(listening)
  } ,[listening])

  useImperativeHandle(ref, () => ({
    handleResetTranscript() {
      resetTranscript()
    }
  }))

  if (!browserSupportsSpeechRecognition) {
    return <IconButton icon={<Icon variant={'mic'} />} variant='disabled' disabled={true} />
  }

  return (
    <div>
      {
        listening
          ? <IconButton onClick={SpeechRecognition.stopListening} icon={<Icon variant={'stop'} />}
                        variant={recordingStatus === 'acquiring_media' ? 'disabled' : 'active'} 
                        isLoading={recordingStatus === 'acquiring_media'} />
          : <IconButton onClick={startRecognition} icon={<Icon variant={'mic'} />}  />
      }
    </div>
  )
}

export const SpeechToTextButton: any = forwardRef<SpeechToTextButtonBaseRef, SpeechToTextButtonProps>(SpeechToTextButtonBase)

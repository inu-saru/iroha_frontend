import React, { type Ref, forwardRef, useImperativeHandle } from 'react';
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Icon } from "../Icon"
import { IconButton } from "../Button"

interface SpeechToTextButtonProps {
  setTranscript: (value: string) => void;
}

interface SpeechToTextButtonBaseRef {
  handleResetTranscript: () => void
}

const SpeechToTextButtonBase = ({setTranscript}: SpeechToTextButtonProps, ref:Ref<typeof SpeechToTextButton>): JSX.Element => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  React.useEffect(() => {
    setTranscript(transcript)
  }, [transcript])

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
          ? <IconButton onClick={SpeechRecognition.stopListening} icon={<Icon variant={'stop'} />} variant='active' />
          : <IconButton onClick={() => {SpeechRecognition.startListening({ language: 'en-US' })}} icon={<Icon variant={'mic'} />}  />
      }
    </div>
  )
}

export const SpeechToTextButton: any = forwardRef<SpeechToTextButtonBaseRef, SpeechToTextButtonProps>(SpeechToTextButtonBase)

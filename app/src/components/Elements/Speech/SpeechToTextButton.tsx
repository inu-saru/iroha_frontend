import React from 'react';
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Icon } from "../Icon"
import { IconButton } from "../Button"

interface SpeechToTextButtonProps {
  setTranscript: (value: string) => void;
}

export const SpeechToTextButton = ({setTranscript}: SpeechToTextButtonProps): JSX.Element => {
  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  React.useEffect(() => {
    setTranscript(transcript)
  }, [transcript])
  
  if (!browserSupportsSpeechRecognition) {
    return <IconButton icon={<Icon variant={'mic'} />} variant='disabled' disabled={true} />
  }

  return (
    <div>
      {
        listening === true
          ? <IconButton onClick={SpeechRecognition.stopListening} icon={<Icon variant={'stop'} />} variant='active' />
          : <IconButton onClick={() => {SpeechRecognition.startListening({ language: 'en-US' })}} icon={<Icon variant={'mic'} />}  />
      }
    </div>
  );
};

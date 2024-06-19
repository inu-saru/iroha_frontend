import React from "react"
import { Icon } from "../Icon"
import { IconButton } from "../Button"

interface SpeechProps {
  text?: string
}

const speak = (utter: SpeechSynthesisUtterance) => {
  speechSynthesis.cancel()
  speechSynthesis.speak(utter)
}

export const TextToSpeechButton = ({text}:SpeechProps): JSX.Element => {
  React.useEffect(() => {
    window.addEventListener('beforeunload', () => {
      speechSynthesis.cancel()
    })
  }, [])
  
  speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'en-US';
  const voices = window.speechSynthesis.getVoices();
  utter.voice = voices[1]

  return (
    <IconButton 
      onClick={() => {
        speak(utter)
      }}
      icon={<Icon variant={'volumeUp'} />}
    />
  )
}

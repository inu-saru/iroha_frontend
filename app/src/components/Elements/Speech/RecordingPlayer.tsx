import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";

interface RecordingPlayerProps {
  setRecordingStatus: (value: string) => void;
  recognitionStatus: boolean
}

export const RecordingPlayer = ({setRecordingStatus, recognitionStatus}: RecordingPlayerProps): JSX.Element => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false })

  React.useEffect(() => {
    setRecordingStatus(status)
  }, [status])

  React.useEffect(() => {
    if(recognitionStatus) {
      startRecording()
    } else {
      stopRecording()
    }
  }, [recognitionStatus])

  return (
    <div className="mt-2">
      <audio src={mediaBlobUrl} controls />
    </div>
  );
}

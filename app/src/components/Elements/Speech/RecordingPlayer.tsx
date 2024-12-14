import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export const RecordingPlayer = ({setRecordingStatus,recognitionStatus}): JSX.Element => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false })

  React.useEffect(() => {
    setRecordingStatus(status)
  }, [status])

  React.useEffect(() => {
    if(recognitionStatus === true) {
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

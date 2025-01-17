import { useEffect, useState } from "react";
import {
  initRecorder,
  startRecording,
  stopRecording,
} from "../recordingFunctions";

function Recorder({ node }) {
  // state
  const [recorder, setRecorder] = useState(null); // For the Tone.js recorder instance
  const [recordedAudioURL, setRecordedAudioURL] = useState(null); // For saving the recorded audio url
  const [isRecording, setIsRecording] = useState(false); //For saving the recording state
  const [audioDuration, setAudioDuration] = useState(null);

  // Initialize effect nodes
  useEffect(() => {
    if (!node) return;
    console.log("Initializing recorder");
    initRecorder(node, setRecorder);

    return () => {
      // dispose recorder
      if (recorder) recorder.dispose();
    };
  }, []);

  // If a recorded audio URL is available, calculate the duration
  useEffect(() => {
    if (recordedAudioURL) {
      const audio = new Audio(recordedAudioURL);
      audio.onloadedmetadata = () => {
        setAudioDuration(audio.duration);
      };
    }
  }, [recordedAudioURL]);

  // Function to format the duration in mm:ss format
  const formatDuration = (duration) => {
    if (duration === null) return "00:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col text-slate-800 p-4 sm:p-4 rounded-md w-full max-w-lg space-y-4 mx-auto fg-color shadow-lg">
      <p className="text-center font-bold text-xl">Recorder</p>
      {/* Record Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">Record</span>
          <span className="text-sm text-gray-200">
            {isRecording ? "Recording..." : formatDuration(audioDuration)}
          </span>
        </div>
        <button
          onClick={() =>
            isRecording
              ? stopRecording(
                  recorder,
                  isRecording,
                  setIsRecording,
                  setRecordedAudioURL
                )
              : startRecording(recorder, isRecording, setIsRecording)
          }
          className="w-10 h-10 button-color-recorder hover:bg-cyan-900 rounded-full flex items-center justify-center transition-all duration-300"
        >
          {/* Inner Circle/Square */}
          <div
            className={`w-4 h-4 ${
              isRecording ? "bg-red-400" : "bg-red-400 rounded-full"
            } transition-all duration-300`}
            style={{
              borderRadius: isRecording ? "10%" : "50%", // Slight rounding for square
            }}
          ></div>
          <span className="sr-only">
            {isRecording ? "Stop" : "Start"} Recording
          </span>
        </button>
      </div>

      {/* Export Section */}
      {
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">Export</span>
            <span className="text-sm text-gray-200">WAV format</span>
          </div>
          <a
            href={recordedAudioURL}
            target="_blank"
            rel="noopener noreferrer"
            download={`recording-${new Date()
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")}_${new Date()
              .toLocaleTimeString("en-GB", { hour12: false })
              .replace(/:/g, "-")}.wav`}
            className="w-10 h-10 button-color-recorder hover:bg-cyan-900 rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>
      }

      {/* Generated Audio Section */}
      {recordedAudioURL && (
        <div className="flex flex-col gap-4">
          <p className="text-lg text-slate-800 font-semibold">
            Generated Audio:
          </p>
          <audio
            controls
            controlsList="nodownload"
            src={recordedAudioURL}
            className="w-full"
          ></audio>
        </div>
      )}
    </div>
  );
}

export default Recorder;

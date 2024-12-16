import { useState, useCallback } from "react";

const usePlayerState = () => {
  // the first argument is the current state, the second - function to update the argument
  // useState(arg), arg is the initial state

  const [isPlaying, setIsPlaying] = useState(false); // Boolean for the play/pause button
  const [players, setPlayers] = useState([]); // Array of players, one for each grain
  const [position, setPosition] = useState(0); // Start position
  const [grains, setGrains] = useState(10); // Number of grains
  const [rate, setRate] = useState(500); // Rate in milliseconds
  const [duration, setDuration] = useState(500); // Duration in milliseconds
  const [loop, setLoop] = useState(null); // To control the loop
  const [probability, setProbability] = useState(1); // The probability of playing a grain
  // For the audio recording
  const [recorder, setRecorder] = useState(null); // For the Tone.js recorder instance
  const [recordedAudioURL, setRecordedAudioURL] = useState(null); // For saving the recorded audio url
  const [isRecording, setIsRecording] = useState(false); //For saving the recording state

  return {
    state: {
      isPlaying,
      players,
      position,
      grains,
      rate,
      duration,
      loop,
      probability,
      recorder,
      recordedAudioURL,
      isRecording,
    },
    setters: {
      setIsPlaying,
      setPlayers,
      setPosition,
      setGrains,
      setRate,
      setDuration,
      setLoop,
      setProbability,
      setRecorder,
      setRecordedAudioURL,
      setIsRecording,
    }
  };
};

export default usePlayerState;

"use client";

import React, { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

function Visualizer({ fileUrl, onSampleReady }) {
  const waveformContainerRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (fileUrl) {
      // Initialize WaveSurfer
      const wavesurfer = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: "rgba(211, 211, 211, 1)",
        progressColor: "rgba(211, 211, 211, 1)",
        cursorColor: "rgba(168, 85, 247, 0.5)",
        cursorWidth: 5,
        responsive: true,
        interact: false,
      });

      wavesurfer.load(fileUrl);
      wavesurfer.setMuted(true); // disable volume of the visualizer to avoid double audio source

      // Pass the visualizer instance to the page only when it's ready
      wavesurfer.on("ready", () => {
        onSampleReady(wavesurfer);
      });

      // Restart playback when it finishes (loop)
      //wavesurfer.on("finish", () => {
      //  wavesurfer.play();
      // });

      wavesurferRef.current = wavesurfer;

      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
        }
      };
    }
  }, [fileUrl, onSampleReady]);

  return (
    <div
      className="m-1 px-2"
      ref={waveformContainerRef}
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
}

export default Visualizer;

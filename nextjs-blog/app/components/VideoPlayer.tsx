"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface Props {
  videoUrl?: string;
}

export default function VideoPlayer({ videoUrl }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.4; 

    if ("requestVideoFrameCallback" in video) {
      const sync = () => {
        video.requestVideoFrameCallback(sync);
      };
      video.requestVideoFrameCallback(sync);
    }
  }, []);

  if (!videoUrl) return null;

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-lg">
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="w-full h-full object-cover will-change-transform"
      />

      <div className="absolute bottom-4 w-full flex justify-center">
        <Link
          href="/home"
          className="px-20 py-3 bg-black/80 backdrop-blur-md text-white font-semibold rounded-lg shadow-md hover:text-black hover:bg-white/60 transition-colors"
        >
          Enter Site
        </Link>
      </div>
    </div>
  );
}

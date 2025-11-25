"use client";

import Link from "next/link";

interface Props {
  videoUrl?: string;
}

export default function VideoPlayer({ videoUrl }: Props) {
  if (!videoUrl) return null;

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-lg">
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        onPlay={(e) => {
          e.currentTarget.playbackRate = 0.3;
        }}
        onTimeUpdate={(e) => {
          const vid = e.currentTarget;
          if (vid.currentTime < 0.05) {
            vid.playbackRate = 0.3;
          }
        }}
      />
      <div className="absolute bottom-4 w-full flex justify-center">
        <Link
          href="/home"
          className="px-20 py-3 bg-black/80 backdrop-blur-md text-white font-semibold rounded-lg shadow-md hover:text-black hover:bg-white/60"
        >
          Enter Site
        </Link>
      </div>
    </div>
  );
};
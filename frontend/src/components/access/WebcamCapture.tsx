'use client';

import {
  useRef,
  useState,
  useEffect,
} from 'react';

export default function WebcamCapture({
  onCapture,
}: {
  onCapture: (img: File) => void;
}) {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const [stream, setStream] =
    useState<MediaStream | null>(
      null,
    );

  useEffect(() => {
    const startCamera =
      async () => {
        const media =
          await navigator.mediaDevices.getUserMedia(
            {
              video: true,
            },
          );

        if (videoRef.current) {
          videoRef.current.srcObject =
            media;
        }

        setStream(media);
      };

    startCamera();

    return () => {
      stream?.getTracks().forEach(
        (track) => track.stop(),
      );
    };
  }, []);

  const takePhoto = async () => {
    const video =
      videoRef.current;

    const canvas =
      canvasRef.current;

    if (!video || !canvas) return;

    const ctx =
      canvas.getContext('2d');

    if (!ctx) return;

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;

    ctx.drawImage(
      video,
      0,
      0,
    );

    const image =
      canvas.toDataURL('image/jpeg');

    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });

    onCapture(file);
  };

  return (
    <div className="space-y-2">
      <video
        ref={videoRef}
        autoPlay
        className="w-full rounded-xl border"
      />

      <canvas
        ref={canvasRef}
        className="hidden"
      />

      <button
        onClick={takePhoto}
        className="bg-black text-white px-4 py-2 rounded-xl"
      >
        Tomar Foto
      </button>
    </div>
  );
}
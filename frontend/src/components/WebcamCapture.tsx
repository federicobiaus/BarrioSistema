'use client';

import {
  useCallback,
  useRef,
  useState,
} from 'react';

import Webcam from 'react-webcam';

interface Props {
  onCapture: (file: File) => void;
}

export default function WebcamCapture({
  onCapture,
}: Props) {
  const webcamRef = useRef<Webcam | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  const capture = useCallback(async () => {
    if (!webcamRef.current) return;

    const imageSrc =
      webcamRef.current.getScreenshot();

    if (!imageSrc) return;

    setPreview(imageSrc);

    const response = await fetch(imageSrc);

    const blob = await response.blob();

    const file = new File(
      [blob],
      'capture.jpg',
      {
        type: 'image/jpeg',
      },
    );

    onCapture(file);
  }, [onCapture]);

  return (
    <div className="flex flex-col gap-4">
      {!preview && (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-72 object-cover"
          videoConstraints={{
            facingMode: 'user',
          }}
        />
      )}

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="rounded-xl border"
        />
      )}

      <button
        type="button"
        onClick={capture}
        className="bg-black text-white px-4 py-2 rounded-xl"
      >
        Tomar Foto
      </button>
    </div>
  );
}
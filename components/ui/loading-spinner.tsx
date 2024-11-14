"use client";

import { useEffect } from "react";

interface Props {
  size?: number;
}

export default function LoadingSpinner({ size = 40 }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <canvas
        style={{ width: `${size}px`, height: `${size}px` }}
        className="border-t-2 rounded-full border-t-white animate-spin"
      />
    </div>
  );
}

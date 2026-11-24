"use client";

import { useState } from "react";

type PartImageProps = {
  src: string | null;
  alt: string;
  className?: string;
};

function ImagePlaceholder({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-subtle">
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="m21 16-5-5-8 8" />
      </svg>
      <span className="text-xs text-muted">{message}</span>
    </div>
  );
}

export function PartImage({ src, alt, className = "" }: PartImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`overflow-hidden bg-surface-muted ${className}`}>
      {!src ? (
        <ImagePlaceholder message="No image" />
      ) : hasError ? (
        <ImagePlaceholder message="Image could not load" />
      ) : (
        // Plain <img>: images come from any website, so next/image domain config doesn't fit.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setHasError(true)}
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );
}

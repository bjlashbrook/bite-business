'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface VenueImageProps {
  src: string | undefined | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function VenueImage({ src, alt, className, width = 600, height = 400 }: VenueImageProps) {
  const fallbackSrc = 'https://placehold.co/600x400?text=No+Image+Available';
  
  // Initialize with fallback if src is fundamentally invalid
  const initialSrc = (src && typeof src === 'string' && src.trim() !== '') ? src : fallbackSrc;
  const [imgSrc, setImgSrc] = useState(initialSrc);

  // Sync state if src prop changes
  useEffect(() => {
    if (src && typeof src === 'string' && src.trim() !== '') {
      setImgSrc(src);
    } else {
      setImgSrc(fallbackSrc);
    }
  }, [src]);

  return (
    <Image
      src={imgSrc}
      className={className}
      alt={alt}
      width={width}
      height={height}
      // Handles cases where URL is valid but image doesn't exist (404, etc)
      onError={() => setImgSrc(fallbackSrc)}
      // Optional: unoptimized if dealing with external domains not in next.config
      unoptimized={imgSrc.startsWith('https://placehold.co')}
    />
  );
}

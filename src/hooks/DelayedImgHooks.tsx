import React, { useState, useEffect } from 'react';

const useDelayedImage = (src: string): string | null => {
  const [sourceLoaded, setSourceLoaded] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
};

export default useDelayedImage;

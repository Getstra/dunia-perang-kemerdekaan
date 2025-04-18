import { useState, useEffect } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
}

export function Image({ src, alt, fallback = '/placeholder.svg', ...props }: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setLoading(false);
    };
    img.onerror = () => {
      setImgSrc(fallback);
      setLoading(false);
    };
  }, [src, fallback]);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      loading="lazy"
      style={{
        opacity: loading ? 0.5 : 1,
        transition: 'opacity 0.3s ease-in-out',
        ...props.style,
      }}
    />
  );
} 
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Tailwind aspect ratio class or arbitrary, e.g. "aspect-[4/5]" */
  aspect?: string;
  /** Container className (fixed-size wrapper) */
  containerClassName?: string;
  /** Image className applied to <img> */
  className?: string;
};

/**
 * Fixed-size image with an elegant shimmer skeleton placeholder that fades
 * out once the image loads. No lazy loading — the browser fetches immediately.
 */
export function SkeletonImage({
  aspect = "aspect-[4/5]",
  containerClassName,
  className,
  onLoad,
  onError,
  alt = "",
  ...imgProps
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[#f5f5f5]",
        aspect,
        containerClassName,
      )}
    >
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 skeleton-shimmer"
        />
      )}
      <img
        {...imgProps}
        alt={alt}
        decoding="async"
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </div>
  );
}

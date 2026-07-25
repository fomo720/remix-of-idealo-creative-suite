import { type CSSProperties } from "react";
import wave from "@/assets/mascot-wave.webp";
import point from "@/assets/mascot-point.webp";
import celebrate from "@/assets/mascot-celebrate.webp";
import alert from "@/assets/mascot-alert.webp";
import think from "@/assets/mascot-think.webp";
import confused from "@/assets/mascot-confused.webp";
import thumbsup from "@/assets/mascot-thumbsup.webp";
import hero from "@/assets/mascot-hero.webp";

const POSES = {
  hero,
  wave,
  point,
  celebrate,
  alert,
  think,
  confused,
  thumbsup,
} as const;

export type MascotPose = keyof typeof POSES;
export type MascotAnimation = "float" | "wave" | "bounce" | "none";

type Props = {
  pose?: MascotPose;
  size?: number;
  animation?: MascotAnimation;
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
  alt?: string;
  priority?: boolean;
};

/**
 * Idealo mascot — reusable brand character.
 * Available poses: hero, wave, point, celebrate, alert, think, confused, thumbsup.
 */
export function Mascot({
  pose = "hero",
  size = 160,
  animation = "float",
  flip = false,
  className = "",
  style,
  alt = "Idealo mascota",
  priority = false,
}: Props) {
  const animClass =
    animation === "float"
      ? "mascot-anim-float"
      : animation === "wave"
      ? "mascot-anim-wave"
      : animation === "bounce"
      ? "mascot-anim-bounce"
      : "";

  return (
    <img
      src={POSES[pose]}
      alt={alt}
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      // @ts-expect-error - fetchpriority is a valid HTML attribute
      fetchpriority={priority ? "high" : "auto"}
      className={`pointer-events-none select-none ${animClass} ${className}`}
      style={{
        width: size,
        height: "auto",
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
      draggable={false}
    />
  );
}


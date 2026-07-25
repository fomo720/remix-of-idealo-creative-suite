import { type CSSProperties } from "react";
import wave from "@/assets/mascot-wave.png";
import point from "@/assets/mascot-point.png";
import celebrate from "@/assets/mascot-celebrate.png";
import alert from "@/assets/mascot-alert.png";
import think from "@/assets/mascot-think.png";
import confused from "@/assets/mascot-confused.png";
import thumbsup from "@/assets/mascot-thumbsup.png";
import hero from "@/assets/mascot-hero.png";

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

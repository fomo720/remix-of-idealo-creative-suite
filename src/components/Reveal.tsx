import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  style?: CSSProperties;
};

/**
 * Scroll-reveal wrapper: fades and slides up when it enters the viewport.
 * Uses IntersectionObserver + GPU-friendly transform/opacity for 60 FPS.
 * Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 24,
  duration = 600,
  className = "",
  once = true,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const shouldAnimate = !reduced;
  const inlineStyle: CSSProperties = {
    ...style,
    transitionProperty: shouldAnimate ? "opacity, transform" : "none",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delay}ms`,
    opacity: visible || !shouldAnimate ? 1 : 0,
    transform: visible || !shouldAnimate ? "translate3d(0,0,0)" : `translate3d(0, ${y}px, 0)`,
    willChange: shouldAnimate && !visible ? "opacity, transform" : undefined,
  };

  return (
    
    <Tag ref={ref} className={className} style={inlineStyle}>
      {children}
    </Tag>
  );
}

type RevealGroupProps = {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  y?: number;
};

/** Renders children with staggered reveal delays. */
export function RevealGroup({ children, className, stagger = 80, y = 24 }: RevealGroupProps) {
  return (
    <>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * stagger} y={y} className={className}>
          {child}
        </Reveal>
      ))}
    </>
  );
}

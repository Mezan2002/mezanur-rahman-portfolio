// components/animations/ScrollZoom.jsx
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollZoom({
  src,
  alt,
  width,
  height,
  className = "",
  fromScale = 0.8,
  toScale = 1.2,
  containerHeight = "100vh",
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        {
          scale: fromScale,
        },
        {
          scale: toScale,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [fromScale, toScale]);

  return (
    <div
      ref={containerRef}
      className={`scroll-zoom-container ${className}`}
      style={{
        height: containerHeight,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div ref={imageRef} style={{ width: "100%", height: "auto" }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}

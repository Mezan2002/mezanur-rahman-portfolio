// animations/pageTransition.js
import gsap from "gsap";

export const pageTransitions = {
  // Slide transition
  slide: (onComplete) => {
    const tl = gsap.timeline({ onComplete });

    tl.to(".page-transition", {
      scaleY: 1,
      duration: 0.5,
      ease: "power4.in",
      transformOrigin: "bottom",
    }).to(".page-transition", {
      scaleY: 0,
      duration: 0.5,
      ease: "power4.out",
      transformOrigin: "top",
    });

    return tl;
  },

  // Fade transition
  fade: (onComplete) => {
    const tl = gsap.timeline({ onComplete });

    tl.to(".page-content", {
      opacity: 0,
      duration: 0.3,
    }).to(".page-content", {
      opacity: 1,
      duration: 0.3,
    });

    return tl;
  },

  // Curtain transition
  curtain: (onComplete) => {
    const tl = gsap.timeline({ onComplete });

    tl.to(".curtain-left", {
      x: 0,
      duration: 0.6,
      ease: "power4.inOut",
    })
      .to(
        ".curtain-right",
        {
          x: 0,
          duration: 0.6,
          ease: "power4.inOut",
        },
        "<"
      )
      .to(".curtain-left", {
        x: "-100%",
        duration: 0.6,
        ease: "power4.inOut",
      })
      .to(
        ".curtain-right",
        {
          x: "100%",
          duration: 0.6,
          ease: "power4.inOut",
        },
        "<"
      );

    return tl;
  },

  // Circle expand
  circleExpand: (onComplete) => {
    const tl = gsap.timeline({ onComplete });

    tl.to(".circle-transition", {
      scale: 100,
      duration: 1,
      ease: "power4.in",
    })
      .set(".circle-transition", { scale: 0 })
      .to(".page-content", { opacity: 1, duration: 0.3 });

    return tl;
  },
};

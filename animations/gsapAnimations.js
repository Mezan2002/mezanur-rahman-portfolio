// animations/gsapAnimations.js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animations = {
  // FADE ANIMATIONS
  fadeIn: (element, options = {}) => {
    const {
      duration = 1,
      delay = 0,
      y = 0,
      x = 0,
      stagger = 0,
      ease = "power3.out",
    } = options;

    return gsap.from(element, {
      opacity: 0,
      y,
      x,
      duration,
      delay,
      stagger,
      ease,
    });
  },

  fadeOut: (element, options = {}) => {
    const { duration = 0.8, delay = 0, ease = "power3.in" } = options;
    return gsap.to(element, { opacity: 0, duration, delay, ease });
  },

  // SLIDE ANIMATIONS
  slideUp: (element, options = {}) => {
    const {
      duration = 1,
      delay = 0,
      distance = 100,
      stagger = 0,
      ease = "power4.out",
    } = options;

    return gsap.from(element, {
      y: distance,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease,
    });
  },

  slideDown: (element, options = {}) => {
    const {
      duration = 1,
      delay = 0,
      distance = 100,
      stagger = 0,
      ease = "power4.out",
    } = options;

    return gsap.from(element, {
      y: -distance,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease,
    });
  },

  slideLeft: (element, options = {}) => {
    const {
      duration = 1,
      delay = 0,
      distance = 100,
      stagger = 0,
      ease = "power4.out",
    } = options;

    return gsap.from(element, {
      x: distance,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease,
    });
  },

  slideRight: (element, options = {}) => {
    const {
      duration = 1,
      delay = 0,
      distance = 100,
      stagger = 0,
      ease = "power4.out",
    } = options;

    return gsap.from(element, {
      x: -distance,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease,
    });
  },

  // SCALE ANIMATIONS
  scaleIn: (element, options = {}) => {
    const {
      duration = 1,
      delay = 0,
      scale = 0,
      stagger = 0,
      ease = "back.out(1.7)",
    } = options;

    return gsap.from(element, {
      scale,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease,
    });
  },

  scaleOut: (element, options = {}) => {
    const { duration = 0.5, scale = 0, ease = "back.in(1.7)" } = options;
    return gsap.to(element, { scale, opacity: 0, duration, ease });
  },

  // BLUR TEXT ANIMATION
  blurReveal: (element, options = {}) => {
    const {
      duration = 1,
      delay = 0,
      stagger = 0.03,
      ease = "power2.out",
    } = options;

    return gsap.from(element, {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
      duration,
      delay,
      stagger,
      ease,
    });
  },

  // ROTATION ANIMATIONS
  rotateIn: (element, options = {}) => {
    const { duration = 1, rotation = 180, ease = "power3.out" } = options;

    return gsap.from(element, {
      rotation,
      opacity: 0,
      scale: 0,
      duration,
      ease,
    });
  },

  // CLIP PATH REVEAL
  clipReveal: (element, options = {}) => {
    const { duration = 1.5, delay = 0, ease = "power4.inOut" } = options;

    return gsap.from(element, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration,
      delay,
      ease,
    });
  },

  // SCROLL ANIMATIONS
  scrollFadeIn: (element, options = {}) => {
    const {
      trigger = element,
      start = "top 80%",
      end = "bottom 20%",
      scrub = false,
      toggleActions = "play none none reverse",
    } = options;

    return gsap.from(element, {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        toggleActions,
      },
    });
  },

  scrollScale: (element, options = {}) => {
    const {
      trigger = element,
      start = "top bottom",
      end = "bottom top",
      fromScale = 0.8,
      toScale = 1.2,
    } = options;

    return gsap.fromTo(
      element,
      { scale: fromScale },
      {
        scale: toScale,
        ease: "none",
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub: 1,
        },
      }
    );
  },

  // PARALLAX
  parallax: (element, options = {}) => {
    const { speed = 0.5, start = "top bottom", end = "bottom top" } = options;

    return gsap.to(element, {
      y: (i, target) => (1 - speed) * ScrollTrigger.maxScroll(window),
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  },

  // MAGNETIC EFFECT
  magnetic: (element, strength = 0.3) => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  },

  // SCROLL TRIGGERED ANIMATION HELPER - NOW PART OF animations OBJECT
  animateOnScroll: (element, animationProps = {}, options = {}) => {
    const {
      trigger = element,
      start = "top 80%",
      end = "bottom 20%",
      toggleActions = "play none none reverse",
      scrub = false,
      markers = false,
    } = options;

    return gsap.from(element, {
      ...animationProps,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions,
        scrub,
        markers,
      },
    });
  },
};

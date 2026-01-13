// animations/fancyAnimations.js
import gsap from "gsap";

export const fancyAnimations = {
  // Directional counter - slides up when increasing, down when decreasing
  directionalCounter: (element, options = {}) => {
    const {
      start = 0,
      end = 100,
      duration = 2,
      decimals = 0,
      ease = "power2.out",
      onUpdate = null,
      onComplete = null,
    } = options;

    const obj = { value: start };
    const isIncreasing = end > start;

    const animation = gsap.to(obj, {
      value: end,
      duration: duration,
      ease: ease,
      onUpdate: () => {
        if (element) {
          element.textContent = obj.value.toFixed(decimals);

          // Add direction class for CSS animations
          if (isIncreasing) {
            element.setAttribute("data-direction", "up");
          } else {
            element.setAttribute("data-direction", "down");
          }
        }
        if (onUpdate) {
          onUpdate(obj.value);
        }
      },
      onComplete: () => {
        if (element) {
          element.textContent = end.toFixed(decimals);
        }
        if (onComplete) {
          onComplete();
        }
      },
    });

    return animation;
  },

  // Rolling digit counter with direction
  rollingDigitCounter: (element, options = {}) => {
    const {
      start = 0,
      end = 100,
      duration = 2,
      decimals = 0,
      ease = "power2.out",
    } = options;

    const isIncreasing = end > start;
    const obj = { value: start };

    // Create wrapper if not exists
    if (element && !element.querySelector(".digit-wrapper")) {
      element.innerHTML = `<span class="digit-wrapper">${start.toFixed(
        decimals
      )}</span>`;
    }

    const digitWrapper = element.querySelector(".digit-wrapper");

    const animation = gsap.to(obj, {
      value: end,
      duration: duration,
      ease: ease,
      snap: { value: decimals === 0 ? 1 : 1 / Math.pow(10, decimals) },
      onUpdate: () => {
        if (digitWrapper) {
          const currentValue = obj.value.toFixed(decimals);
          digitWrapper.textContent = currentValue;

          // Animate slide direction
          const slideDistance = isIncreasing ? -100 : 100;

          gsap.fromTo(
            digitWrapper,
            { y: -slideDistance + "%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        }
      },
    });

    return animation;
  },
};

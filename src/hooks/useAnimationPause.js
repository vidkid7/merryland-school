import { useEffect, useRef } from 'react';

/**
 * Custom hook to pause CSS animations when element leaves viewport
 * Improves performance by stopping animations that aren't visible
 * 
 * @param {boolean} enabled - Whether to enable animation pausing (default: true)
 * @returns {Object} ref - Ref to attach to the animated element
 */
export function useAnimationPause(enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible - resume animations
            element.style.animationPlayState = 'running';
          } else {
            // Element is not visible - pause animations
            element.style.animationPlayState = 'paused';
          }
        });
      },
      {
        threshold: 0, // Trigger as soon as any part enters/leaves viewport
        rootMargin: '50px', // Add 50px buffer to prevent flickering
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [enabled]);

  return ref;
}

/**
 * Utility function to pause all animations within a container
 * Useful for pausing multiple animated children at once
 * 
 * @param {HTMLElement} container - Container element with animated children
 * @param {boolean} pause - Whether to pause (true) or resume (false) animations
 */
export function pauseAnimations(container, pause = true) {
  if (!container) return;

  const playState = pause ? 'paused' : 'running';
  
  // Pause animations on the container itself
  container.style.animationPlayState = playState;
  
  // Pause animations on all children
  const animatedElements = container.querySelectorAll('*');
  animatedElements.forEach((element) => {
    element.style.animationPlayState = playState;
  });
}

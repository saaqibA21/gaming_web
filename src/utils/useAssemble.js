import { useEffect, useRef, useState } from 'react';

/**
 * Hook to trigger assembly animation when an element scrolls into view.
 * @param {number} threshold - Percentage of element visible before triggering (0 to 1)
 * @returns {[React.RefObject, boolean]} [ref, isAssembled]
 */
export function useAssemble(threshold = 0.15) {
  const ref = useRef(null);
  const [isAssembled, setIsAssembled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsAssembled(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAssembled(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isAssembled];
}

/**
 * Initializes a document-wide observer for any element with the 'assemble-on-scroll' class.
 * Automatically adds 'is-assembled' when the element enters the viewport.
 */
export function initGlobalAssemblyObserver() {
  if (typeof window === 'undefined' || !window.IntersectionObserver) return () => {};

  const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-assembled');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  const observeElements = () => {
    const targets = document.querySelectorAll('.assemble-on-scroll:not(.is-assembled)');
    targets.forEach(el => observer.observe(el));
  };

  observeElements();

  // Watch for dynamic DOM updates
  const mutationObserver = new MutationObserver(() => {
    observeElements();
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    mutationObserver.disconnect();
  };
}

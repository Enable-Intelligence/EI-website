import { useEffect, useState } from "react";

export default function useIntersectionObserver(
  elementRef,
  options = { threshold: 0.1 }
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [elementRef, JSON.stringify(options)]);

  return isIntersecting;
}
import React, { useState, useEffect, useRef } from "react";

const SectionLazyImage = ({ src, placeholder, alt, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], observerInstance) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerInstance.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      className={`transition duration-300 ${!isVisible ? 'blur-sm scale-105' : 'blur-0 scale-100'}`}
      src={isVisible ? src : placeholder}
      alt={alt}
      {...props}
    />
  );
};

export default SectionLazyImage;

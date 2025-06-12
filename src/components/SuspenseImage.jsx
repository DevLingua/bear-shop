// components/SuspenseImage.jsx
const imageCache = new Map();

function loadImage(src) {
  if (!imageCache.has(src)) {
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.set(src, true); // ✅ mark as loaded
        resolve();
      };
      img.onerror = (err) => {
        imageCache.set(src, false); // ❌ mark as failed
        reject(err);
      };
    });
    imageCache.set(src, promise); // 🕒 store loading promise temporarily
    throw promise;
  }

  const value = imageCache.get(src);
  if (value instanceof Promise) {
    throw value; // 🕒 still loading
  }
  if (value === false) {
    throw new Error("Image failed to load"); // ❌ loading failed
  }

  // ✅ loaded successfully
}

export default function SuspenseImage({ src, alt, ...props }) {
  loadImage(src);
  return <img src={src} alt={alt} {...props} />;
}

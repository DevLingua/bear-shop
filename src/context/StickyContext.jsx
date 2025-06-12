import { createContext, useContext, useState } from "react";

const StickyContext = createContext();

export function StickyProvider({ children }) {
  const [isSticky, setIsSticky] = useState(false);

  return (
    <StickyContext.Provider value={{ isSticky, setIsSticky }}>
      {children}
    </StickyContext.Provider>
  );
}

export function useSticky() {
  return useContext(StickyContext);
}

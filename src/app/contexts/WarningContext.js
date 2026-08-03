'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const WarningContext = createContext();

export function WarningProvider({ children }) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if(process.env.NEXT_PUBLIC_API_BASE_URL?.includes("skyfi.network")){
      setShowWarning(true);
    }
  }, []);

  const closeWarning = () => {
    setShowWarning(false);
  };

  return (
    <WarningContext.Provider value={{ showWarning, closeWarning }}>
      {children}
    </WarningContext.Provider>
  );
}

export function useWarning() {
  const context = useContext(WarningContext);
  if (!context) {
    throw new Error('useWarning must be used within a WarningProvider');
  }
  return context;
}

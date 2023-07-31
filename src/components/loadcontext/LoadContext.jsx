import { createContext, useContext, useState } from 'react';

const LoadContext = createContext();

export const useLoad = () => useContext(LoadContext);

export const LoadProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const isLoadingOn = () => {
    setIsLoading(true);
  };

  const isLoadingOff = () => {
    setIsLoading(false);
  };

  return (
    <LoadContext.Provider value={{ isLoading, isLoadingOn, isLoadingOff }}>
      {children}
    </LoadContext.Provider>
  );
};

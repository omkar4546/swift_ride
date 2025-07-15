import { useState, createContext } from "react";

export const CaptainDataContext = createContext();

function CaptainContext({ children }) {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  return (
    <>
      <CaptainDataContext.Provider
        value={{
          captain,
          setCaptain,
          isLoading,
          setIsLoading,
          error,
          setError,
          updateCaptain,
        }}
      >
        {children}
      </CaptainDataContext.Provider>
    </>
  );
}

export default CaptainContext;

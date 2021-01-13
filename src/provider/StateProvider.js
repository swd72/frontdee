import React, { createContext, useState } from "react";

export const StateContext = createContext({});
export const StateProvider = ({ children }) => {
  const [progress, setProgress] = useState(20);

  return (
    <StateContext.Provider
      value={{
        progress,
        setProgress,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

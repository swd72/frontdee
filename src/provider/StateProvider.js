import React, { createContext, useState } from "react";

export const StateContext = createContext({});
export const StateProvider = ({ children }) => {
  const [chatBadge, setChatBadge] = useState(null);

  return (
    <StateContext.Provider
      value={{
        chatBadge,
        setChatBadge,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userPrimary, setUserPrimary] = useState(null);

  return (
    <UserContext.Provider value={{ userPrimary, setUserPrimary }}>
      {children}
    </UserContext.Provider>
  );
};

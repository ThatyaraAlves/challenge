import React, { createContext, useContext, useState } from 'react';

interface NavBarContextData {
  title: string;
  setTitle: (title: string) => void;
  rightIcon: string;
  setRightIcon: (rightIcon: string) => void;
  
  
}
interface NavBarProviderProps {
    children: React.ReactNode;
}
const NavBarContext = createContext<NavBarContextData>({} as NavBarContextData);

export const NavBarProvider: React.FC <NavBarProviderProps>= ({ children }) => {
  const [title, setTitle] = useState("");
  const [rightIcon, setRightIcon] = useState("");

  return (
    <NavBarContext.Provider
      value={{
        title,
        setTitle,
        rightIcon,  
        setRightIcon
        
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
};

export const useNavBar = (): NavBarContextData => {
  const context = useContext(NavBarContext);
  
  if (!context) {
    throw new Error('useNavBar must be used within a NavBarProvider');
  }

  return context;
};

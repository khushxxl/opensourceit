"use client";
import React, { useState } from "react";

export const AppContext = React.createContext();

function AppContextProvider({ children }) {
  const [showAddProjectSidebar, setshowAddProjectSidebar] = useState(false);
  const [allOpenSourceProjects, setallOpenSourceProjects] = useState([]);

  const [filterText, setfilterText] = useState("");
  return (
    <AppContext.Provider
      value={{
        showAddProjectSidebar,
        setshowAddProjectSidebar,
        allOpenSourceProjects,
        setallOpenSourceProjects,
        filterText,
        setfilterText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;

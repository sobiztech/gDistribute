import React, { createContext } from "react";

export const MyContext = createContext();

function ContextProvider({ children }) {
  const [pop, setpop] = React.useState(false);
  const [openmodel, setopenmodel] = React.useState(false);
  

  return (
    <MyContext.Provider
      value={{
        pop: pop,
        setpop: setpop,
        openmodel: openmodel,
        setopenmodel: setopenmodel
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContextProvider;

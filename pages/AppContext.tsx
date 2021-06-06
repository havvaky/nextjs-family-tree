import React, { createContext, useState } from "react";

// @ts-ignore
const AppContext = createContext();

function AppProvider(props:any) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    function toggleSignIn(): void {
       if(isSignedIn === true) {
           setIsSignedIn(false);
       } else {
           setIsSignedIn(true)
       }
    }

    const value = {
        isSignedIn: isSignedIn,
        toggleSignIn : toggleSignIn
    };

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export {AppContext, AppProvider}

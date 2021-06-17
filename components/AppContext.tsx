import React, { createContext, useState } from "react";

interface SignInValue <Type> {
    isSignedIn: boolean,
    toggleSignIn: () => void,
}


const AppContext = createContext(null);

function AppProvider({children}) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    function toggleSignIn() {
       if(isSignedIn === true) {
           setIsSignedIn(false);
       } else {
           setIsSignedIn(true)
       }
    }

    const value : SignInValue<boolean>= {
        isSignedIn: isSignedIn,
        toggleSignIn : toggleSignIn,
    };

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export {AppContext, AppProvider}

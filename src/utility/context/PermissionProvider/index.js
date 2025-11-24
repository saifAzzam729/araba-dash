// ** Imports createContext function
import React, { createContext } from "react";

// ** Imports createContextualCan function
import { createContextualCan } from "@casl/react";
import { useAuth } from "../AuthProvider";
import defineAbilityFor from '../../context/PermissionProvider/ability'

// ** Create Context
export const AbilityContext = createContext();

// ** Init Can Context
export const Can = createContextualCan(AbilityContext.Consumer);


function PermissionProvider(props) {
    const {user} = useAuth()

    if (!user) {
        return  <React.Fragment {...props} />
    }

    const abilities = defineAbilityFor(user)

    return (
        <AbilityContext.Provider value={abilities} {...props} />  
    )
}
export default PermissionProvider;
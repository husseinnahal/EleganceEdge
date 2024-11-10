"use client";
import { createContext, useContext, useState} from "react";

export const UserContext = createContext();

export default function Contextuser({ children }) {

    const [DisplayUser,setDisplayUser]=useState("none");
    const [Login,setLogin]=useState("none");
    const [Cartdisplay,setCartdisplay]=useState("100%");
    const [Nbinwishlist,setNbinwishlist]=useState(false);
    const [RefrCartinhead,setRefCartinhead]=useState(false);
    const [Searsh,setSearsh]=useState("none");


  return (

    <UserContext.Provider value={{DisplayUser,setDisplayUser,Login,setLogin,Cartdisplay,setCartdisplay,Nbinwishlist,setNbinwishlist,RefrCartinhead,setRefCartinhead,Searsh,setSearsh}}>
      {children}
    </UserContext.Provider>
  );
}

export const CheckToken=()=>{
  return useContext(UserContext);
} 
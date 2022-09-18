import React, { createContext, useReducer } from "react"
import * as THREE from 'three'

export interface GlobalContextProviderProps {
   children: React.ReactNode
}

interface GlobalContextInterface {
    name: string
    author: string
    url: string
    clock: THREE.Clock
}



const defaultGlobalState: GlobalContextInterface = {
    name: "Using React Context in a Typescript App",
    author: "thehappybug",
    url: "http://www.example.com",
    clock: new THREE.Clock()
}

const GlobalStateContext = createContext<GlobalContextInterface>(defaultGlobalState)
const dispatchStateContext = createContext(undefined)

const GlobalContextProvider = (props: GlobalContextProviderProps) => {
    const [state, dispatch] = useReducer(
        (state: GlobalContextInterface, newValue: GlobalContextInterface) => ({ ...state, ...newValue }),
        defaultGlobalState
    )
    const { children } = props
    return (
    <GlobalStateContext.Provider value={state}>
        {/* <dispatchStateContext.Provider value={dispatch}> */}
        {children}
        {/* </dispatchStateContext.Provider> */}
    </GlobalStateContext.Provider>
    )
    
}

const useGlobalContext = () => [
    React.useContext(GlobalStateContext),
    // React.useContext(DispatchStateContext)
  ];

export { GlobalContextProvider, useGlobalContext }
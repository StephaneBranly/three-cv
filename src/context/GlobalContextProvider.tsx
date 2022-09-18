import React, { createContext, Dispatch, useContext, useReducer } from "react"
import * as THREE from 'three'

export interface GlobalContextProviderProps {
   children: React.ReactNode
}

interface GlobalContextInterface {
    wheel: number
    clock: THREE.Clock
}

const defaultGlobalState: GlobalContextInterface = {
    wheel: 0,
    clock: new THREE.Clock()
}

const GlobalStateContext = createContext<{state: GlobalContextInterface, dispatch: Dispatch<Partial<GlobalContextInterface>> }>({state: defaultGlobalState, dispatch: () => {}})

const GlobalContextProvider = (props: GlobalContextProviderProps) => {
    const [state, dispatch] = useReducer(
        (state: GlobalContextInterface, newValue: Partial<GlobalContextInterface>) => ({ ...state, ...newValue }),
        defaultGlobalState
    )
    const { children } = props
    return (
        <GlobalStateContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalStateContext.Provider>
    )
    
}

const useGlobalContext = () => useContext(GlobalStateContext)

export { GlobalContextProvider, useGlobalContext }
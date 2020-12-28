import React from 'react';
import IGState from './interfaces/IGState'
import IAction from './interfaces/IAction'

const initialState: IGState = { currentCoin: 'btc', errorMsg: '' }

export const Store = React.createContext<IGState | any>(initialState)


const reducer = (gState: IGState, action: IAction): IGState => {
    switch (action.type) {
        case 'UPDATE_CURRENT_COIN':
            return { ...gState, currentCoin: action.payload }
        case 'SET_ERROR_MSG':
            return { ...gState, errorMsg: action.payload }
        default:
            return gState
    }
}

export const StoreProvider = (props: any): JSX.Element => {
    const [gState, dispatch] = React.useReducer(reducer, initialState)
    return <Store.Provider value={{ gState, dispatch }}>{props.children}</Store.Provider>
} 
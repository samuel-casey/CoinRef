import React from 'react';
import IGState from './interfaces/IGState'

const initialState: IGState = { currentCoin: 'btc', errorMsg: '' }

export const Store = React.createContext<IGState>(initialState)


const reducer = (state, action) => {

}

export const StoreProvider = (props: any): JSX.Element => {
    return <Store.Provider value={initialState}>{props.children}</Store.Provider>
} 
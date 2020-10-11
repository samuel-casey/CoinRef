import React from 'react';
import { CoinContext } from '../../App';
import './CoinImg.scss';

export const CoinImg = () => {
	const currentCoin = React.useContext(CoinContext);
	// const symbol =
	const imgOrSymbol = 'symbol';
	// const imgOrSymbole = props.img ? props.img : props.symbol
	return <div className='coin-img'>{imgOrSymbol}</div>;
};

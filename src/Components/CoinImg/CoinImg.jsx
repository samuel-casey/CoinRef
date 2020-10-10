import React from 'react';
import './CoinImg.scss';

export const CoinImg = (props) => {
	const imgOrSymbol = props.img ? props.img : 'BTC';
	// const imgOrSymbole = props.img ? props.img : props.symbol
	return <div className='coin-img'>{imgOrSymbol}</div>;
};

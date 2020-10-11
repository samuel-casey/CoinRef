import React from 'react';
import { CoinContext } from '../../App';
import './CoinImg.scss';

export const CoinImg = () => {
	const currentCoin = React.useContext(CoinContext);
	const imgOrSymbol = currentCoin ? currentCoin.toUpperCase() : 'loading...';
	return (
		<div className='coin-img' alt='currentCoin-img'>
			{imgOrSymbol}
		</div>
	);
};

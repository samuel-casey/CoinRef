import React from 'react';
// import { CoinContext } from '../../App';
import './CoinImg.scss';

export const CoinImg = ({ coinProfileData }) => {
	// const currentCoin = React.useContext(CoinContext);
	let imgOrSymbol = coinProfileData ? coinProfileData.symbol : '';
	return (
		<div className='coin-img' alt='currentCoin-img'>
			{imgOrSymbol}
		</div>
	);
};

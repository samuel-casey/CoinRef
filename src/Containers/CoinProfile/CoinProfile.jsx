import React from 'react';
import './CoinProfile.scss';
import { CoinSummary } from '../../Components/CoinSummary/CoinSummary';
import { CoinImg } from '../../Components/CoinImg/CoinImg';
import { CoinResources } from '../../Components/CoinResources/CoinResources';
import { CoinDescription } from '../../Components/CoinDescription/CoinDescription';

export const CoinProfile = (props) => {
	return (
		<div className='coin-profile'>
			<div className='coin-summary-cont'>
				<CoinImg />
				<CoinSummary />
			</div>
		</div>
	);
};

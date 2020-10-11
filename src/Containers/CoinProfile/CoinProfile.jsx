import React, { useState, useContext, useEffect } from 'react';
import './CoinProfile.scss';
import { CoinSummary } from '../../Components/CoinSummary/CoinSummary';
import { CoinImg } from '../../Components/CoinImg/CoinImg';
import { CoinResources } from '../../Components/CoinResources/CoinResources';
import { CoinDescription } from '../../Components/CoinDescription/CoinDescription';
import { CoinContext } from '../../App';

export const CoinProfile = () => {
	let currentCoin = useContext(CoinContext);
	const [coinProfileData, setCoinProfileData] = useState(null);

	function fetchAssetData(coin) {
		fetch(`https://data.messari.io/api/v2/assets/${coin}/profile`, {
			headers: {
				method: 'GET',
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((body) => {
				const data = body.data;
				setCoinProfileData(data);
			})
			.catch((error) => console.log(error.message));
	}

	useEffect(() => {
		fetchAssetData(currentCoin);
	}, []);

	return (
		<div className='coin-profile'>
			<div className='coin-summary-cont'>
				<CoinImg className='coin-img-comp' />
				<CoinSummary className='coin-summary-comp' />
			</div>
			<CoinDescription coinProfileData={coinProfileData} />
			<CoinResources />
		</div>
	);
};

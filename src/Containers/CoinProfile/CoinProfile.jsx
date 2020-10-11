import React, { useState, useContext, useEffect } from 'react';
import './CoinProfile.scss';
import { CoinSummary } from '../../Components/CoinSummary/CoinSummary';
import { CoinImg } from '../../Components/CoinImg/CoinImg';
import { CoinResources } from '../../Components/CoinResources/CoinResources';
import { CoinDescription } from '../../Components/CoinDescription/CoinDescription';
import { CoinContext } from '../../App';

///////// need to hide this with netlify functions ////////////
const MESSARI_API_KEY = '9ada99d9-1714-4298-b5b8-3c5330af5498';

export const CoinProfile = () => {
	let currentCoin = useContext(CoinContext);
	const [coinProfileData, setCoinProfileData] = useState(null);
	const [coinMetricsData, setCoinMetricsData] = useState(null);

	function fetchAssetData(coin) {
		Promise.all([
			fetch(`https://data.messari.io/api/v2/assets/${coin}/profile`, {
				headers: {
					method: 'GET',
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-messari-api-key': MESSARI_API_KEY,
				},
			}),
			fetch(`https://data.messari.io/api/v1/assets/${coin}/metrics`, {
				headers: {
					method: 'GET',
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-messari-api-key': MESSARI_API_KEY,
				},
			}),
		])
			.then((responses) => {
				return Promise.all(
					responses.map((response) => {
						return response.json();
					})
				);
			})
			.then((dataObjects) => {
				setCoinProfileData(dataObjects[0].data);
				setCoinMetricsData(dataObjects[1].data);
			})
			.catch((error) => {
				console.log('error: ', error);
				alert('Ahh!', error);
			});
	}

	useEffect(() => {
		fetchAssetData(currentCoin);
	}, [currentCoin]);

	return (
		<div className='coin-profile'>
			<div className='coin-summary-cont'>
				<CoinImg className='coin-img-comp' coinProfileData={coinProfileData} />
				<CoinSummary
					className='coin-summary-comp'
					coinMetricsData={coinMetricsData}
					coinProfileData={coinProfileData}
				/>
			</div>
			<CoinDescription coinProfileData={coinProfileData} />
			<CoinResources coinProfileData={coinProfileData} />
		</div>
	);
};

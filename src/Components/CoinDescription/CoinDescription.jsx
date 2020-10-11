import React, { useState, useEffect, useContext } from 'react';
import { CoinContext } from '../../App';
import './CoinDescription.scss';

export const CoinDescription = (props) => {
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

	function cleanseDescription() {
		coinProfileData
			? (description = coinProfileData.profile.general.overview.project_details.replace(
					/<([^>]+)>/g,
					''
			  ))
			: (description = `Loading data for ${currentCoin}`);
	}

	// logging twice
	useEffect(() => {
		fetchAssetData(currentCoin);
	}, [currentCoin]);

	let description;

	cleanseDescription();
	return (
		<div className='coin-description'>
			<h5>bitcoin</h5>
			<p>{description}</p>
		</div>
	);
};

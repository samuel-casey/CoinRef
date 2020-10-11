import React, { useContext } from 'react';
import { CoinContext } from '../../App';
import './CoinDescription.scss';

export const CoinDescription = ({ coinProfileData }) => {
	let currentCoin = useContext(CoinContext);
	let description;
	let name;

	function cleanseDescription() {
		if (coinProfileData) {
			description = coinProfileData.profile.general.overview.project_details.replace(
				/<([^>]+)>/g,
				''
			);
			name = coinProfileData.name;
		} else {
			description = `Loading data for ${currentCoin}`;
			name = currentCoin;
		}
	}

	cleanseDescription();
	return (
		<div className='coin-description'>
			<h5>{name}</h5>
			<p>{description}</p>
		</div>
	);
};

import React, { useState, useEffect, useContext } from 'react';
import { CoinContext } from '../../App';
import './CoinDescription.scss';

export const CoinDescription = (props) => {
	let currentCoin = useContext(CoinContext);
	let description;

	function cleanseDescription() {
		props.coinProfileData
			? (description = props.coinProfileData.profile.general.overview.project_details.replace(
					/<([^>]+)>/g,
					''
			  ))
			: (description = `Loading data for ${currentCoin}`);
	}

	cleanseDescription();
	return (
		<div className='coin-description'>
			<h5>bitcoin</h5>
			<p>{description}</p>
		</div>
	);
};

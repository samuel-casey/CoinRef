import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { monthEstToAbbr } from '../../Utils/dateHelpers';
import './CoinSummary.scss';

export const CoinSummary = ({ coinMetricsData, coinProfileData }) => {
	let usdPrice;
	let pctChg;
	let posNeg;
	let pctChgColor;
	let sector;
	let category;
	let dateEst;
	let name = coinProfileData ? (
		coinProfileData.name
	) : (
		<Spinner animation='border' variant='info' />
	);

	if (coinMetricsData) {
		usdPrice = coinMetricsData.market_data.price_usd;
		usdPrice = usdPrice
			.toFixed(2)
			//convert to string and add thousands comma separators
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		pctChg = coinMetricsData.market_data.percent_change_usd_last_24_hours;
		pctChg = pctChg.toFixed(2);

		if (pctChg > 0) {
			posNeg = '+';
			pctChgColor = 'green';
		} else {
			posNeg = '';
			pctChgColor = 'red';
		}
	}

	const price = coinMetricsData ? (
		<>
			<span>Price: ${usdPrice}</span>(
			<span style={{ color: pctChgColor }}>
				{posNeg}
				{pctChg}%
			</span>
			<span>24hr)</span>
		</>
	) : (
		'loading...'
	);

	if (coinProfileData) {
		// CHECK THAT THE COIN HAS A SECTOR, IF NOT, SET TO 'N/A'
		sector = coinProfileData.profile.general.overview.sector
			? coinProfileData.profile.general.overview.sector
			: 'N/A';
		// CHECK THAT THE COIN HAS A CATEGORY, IF NOT, SET TO 'N/A'
		category = coinProfileData.profile.general.overview.category
			? coinProfileData.profile.general.overview.category
			: 'N/A';
		// CHECK THAT THE COIN HAS AN INITIAL DISTRIBUTION DATE AND GET YEAR
		let yearEst = coinProfileData.profile.economics.launch.initial_distribution
			.genesis_block_date
			? new Date(
					coinProfileData.profile.economics.launch.initial_distribution.genesis_block_date
			  ).getFullYear()
			: '';
		// CHECK THAT THE COIN HAS AN INITIAL DISTRIBUTION DATE AND GET MONTH
		let monthEst = coinProfileData.profile.economics.launch.initial_distribution
			.genesis_block_date
			? new Date(
					coinProfileData.profile.economics.launch.initial_distribution.genesis_block_date
			  ).getMonth()
			: '';
		let monthEstAbbreviation = monthEstToAbbr(monthEst);
		dateEst = `${monthEstAbbreviation} ${yearEst}`;
	}

	return (
		<div className='coin-summary'>
			<h4>{name}</h4>
			<div className='coin-summary-data'>
				<div className='coin-price'>{price}</div>
				<div className='detail-list'>
					<ul>
						<li>Sector: {sector}</li>
						<li>Category: {category}</li>
						<li>Est date: {dateEst}</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

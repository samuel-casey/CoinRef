import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './CoinSummary.scss';

export const CoinSummary = (props) => {
	let usdPrice;
	let pctChg;
	let posNeg;
	let pctChgColor;
	let sector;
	let category;
	let dateEst;
	let name = props.coinProfileData ? (
		props.coinProfileData.name
	) : (
		<Spinner animation='border' variant='info' />
	);

	console.log(props.coinProfileData);

	if (props.coinMetricsData) {
		usdPrice = props.coinMetricsData.market_data.price_usd;
		usdPrice = usdPrice
			.toFixed(2)
			//convert to string and add thousands comma separators
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		pctChg = props.coinMetricsData.market_data.percent_change_usd_last_24_hours;
		pctChg = pctChg.toFixed(2);

		if (pctChg > 0) {
			posNeg = '+';
			pctChgColor = 'green';
		} else {
			posNeg = '-';
			pctChgColor = 'red';
		}
	}

	const price = props.coinMetricsData ? (
		<>
			<span>Price: {usdPrice} USD</span>(
			<span style={{ color: pctChgColor }}>
				{posNeg}
				{pctChg}%
			</span>
			<span>24hr)</span>
		</>
	) : (
		'loading...'
	);

	if (props.coinProfileData) {
		sector = props.coinProfileData.profile.general.overview.sector;
		category = props.coinProfileData.profile.general.overview.category;
		dateEst = '2009';
		let yearEst = new Date(
			props.coinProfileData.profile.economics.launch.initial_distribution.genesis_block_date
		).getFullYear();
		let monthEst = new Date(
			props.coinProfileData.profile.economics.launch.initial_distribution.genesis_block_date
		).getMonth();
		let monthEstAbbreviation = monthEstToAbbr(monthEst);
		dateEst = `${monthEstAbbreviation}, ${yearEst}`;
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

// HELPER FUNCTION TO TURN MONTH AS NO. TO MONTH AS ABBR.
function monthEstToAbbr(monthEst) {
	switch (monthEst) {
		case 0:
			return 'Jan';
		case 1:
			return 'Feb';
		case 2:
			return 'Mar';
		case 3:
			return 'Apr';
		case 4:
			return 'May';
		case 5:
			return 'Jun';
		case 6:
			return 'Jul';
		case 7:
			return 'Aug';
		case 8:
			return 'Sep';
		case 9:
			return 'Oct';
		case 10:
			return 'Nov';
		case 11:
			return 'Dec';
	}
}

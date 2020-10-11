import React from 'react';
// import {} from 'react-bootstrap';
import './CoinSummary.scss';

export const CoinSummary = (props) => {
	let usdPrice;
	let pctChg;
	let posNeg;
	let pctChgColor;
	let sector;
	let category;
	let protocol;

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
		'loading price data...'
	);

	if (props.coinProfileData) {
		sector = props.coinProfileData.sector;
	}

	return (
		<div className='coin-summary'>
			<h4>bitcoin</h4>
			<div className='coin-summary-data'>
				<div className='coin-price'>{price}</div>
				<div className='detail-list'>
					<ul>
						<li>sector: {sector}</li>
						<li>category: {category}</li>
						<li>protocol: {protocol}</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

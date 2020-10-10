import React from 'react';
// import {} from 'react-bootstrap';
import './CoinSummary.scss';

export const CoinSummary = (props) => {
	return (
		<div className='coin-summary'>
			<h5>bitcoin</h5>
			<div className='coin-summary-data'>
				<div className='coin-price'>
					<span>Price: $12,000</span>
					<span>(+5% 24hr)</span>
				</div>
				<div className='detail-list'>
					<ul>
						<li>category: payments</li>
						<li>protocol: Bitcoin</li>
						<li>est date: 2009</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

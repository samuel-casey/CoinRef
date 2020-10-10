import React from 'react';
import './CoinDescription.scss';

export const CoinDescription = (props) => {
	return (
		<div className='coin-description'>
			<h5>bitcoin</h5>
			<p>
				Created by Satoshi Nakomoto in 2009. No one knows who they were to this
				day.
			</p>
		</div>
	);
};

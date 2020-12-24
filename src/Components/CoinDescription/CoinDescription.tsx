import React, { useState, useContext } from 'react';
import { CoinContext } from '../../App';
import { CoinBackground } from '../CoinBackground/CoinBackground';
import './CoinDescription.scss';

export const CoinDescription = ({ coinProfileData }) => {
	const {gState} = useContext(CoinContext);
	const {currentCoin} = gState;
	let name;
	let description;
	let background;

	const [coinBgVisible, setCoinBgVisible] = useState(false)


	const cleanseDescription = () => {
		if (coinProfileData) {
			description = coinProfileData.profile.general.overview.project_details.replace(
				/<([^>]+)>/g,
				''
			);
			name = coinProfileData.name;
			background = coinProfileData.profile.general.background.background_details.replace(
				/<([^>]+)>/g,
				''
			);
		} else {
			description = `Loading data for ${currentCoin}`;
			name = currentCoin;
		}
	}

	const coinBgToggle = coinBgVisible ? 'visible' : 'hidden';

	const more = <span><i className="fas fa-caret-down"></i></span>
	const less = <span><i className="fas fa-caret-up"></i></span>

	const handleToggleClick = () => {
		setCoinBgVisible(!coinBgVisible)
	}

	cleanseDescription();
	return (
		<div className='coin-description'>
			<h5>{name} overview</h5>
			<p>{description}</p>
			<div className={`coin-background ${coinBgToggle}`}>
			<h5>{name} background</h5>
			<CoinBackground coinBgVisible={coinBgVisible} background={background}/>
			</div>
			<div className='show-more' onClick={handleToggleClick}>{coinBgVisible ? less : more}</div>
		</div>
	);
};

import React, { useState, useContext, useEffect } from 'react';
import './CoinProfile.scss';
import { CoinSummary } from '../../Components/CoinSummary/CoinSummary';
import { CoinImg } from '../../Components/CoinImg/CoinImg';
import { CoinDescription } from '../../Components/CoinDescription/CoinDescription';
import { CoinResources } from '../../Components/CoinResources/CoinResources';
import { CoinContext } from '../../App';
import { CoinChart } from '../../Components/CoinChart/CoinChart';
import { setChartDataInterval } from '../../helpers/dateHelpers';
import { fetchAssetMetricsData, fetchAssetPriceData, fetchAssetProfileData } from '../../apis/messari';

const {REACT_APP_MESSARI_API_KEY} = process.env;

export const CoinProfile = () => {
	const {gState, setGState} = useContext(CoinContext);
	const {currentCoin, errorMsg} = gState;
	const [coinProfileData, setCoinProfileData] = useState(null);
	const [coinMetricsData, setCoinMetricsData] = useState(null);
	const [chartData, setChartData] = useState();
	const [numDaysPriceData, setNumDaysPriceData] = useState(30)

	// calc today's date and num days in the past to get data for based on user input
	const [today, maxInterval] = setChartDataInterval(numDaysPriceData)

	useEffect(() => {

		const getCoinData = async () => {
			const profile = await fetchAssetProfileData(currentCoin, gState, setGState);
			const metrics = await fetchAssetMetricsData(currentCoin, gState, setGState);
			const priceData = await fetchAssetPriceData(currentCoin, today, maxInterval, gState,setGState)
			setCoinProfileData(profile)
			setCoinMetricsData(metrics)
			setChartData(priceData)
		}

		getCoinData();

	}, [currentCoin, maxInterval]);

	const coinProfile = errorMsg === '' ? (<><div className='coin-profile'>
			<div className='coin-summary-cont'>
				<CoinImg className='coin-img-comp' coinProfileData={coinProfileData} />
				<CoinSummary
					coinMetricsData={coinMetricsData}
					coinProfileData={coinProfileData}
				/>
			</div>
			<CoinDescription coinProfileData={coinProfileData} />
			<CoinResources coinProfileData={coinProfileData} />
		</div>
			<CoinChart chartData={chartData} today={today} numDaysPriceData={numDaysPriceData} setNumDaysPriceData={setNumDaysPriceData}/></>) : <><div>{errorMsg}</div></>

	return (
		<div>
		{coinProfile}
		</div>
	);
};

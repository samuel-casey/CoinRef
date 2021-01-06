import React, { useState, useContext, useEffect } from 'react';
import { CoinSummary } from '../../Components/CoinSummary/CoinSummary';
import { CoinImg } from '../../Components/CoinImg/CoinImg';
import { CoinDescription } from '../../Components/CoinDescription/CoinDescription';
import { CoinResources } from '../../Components/CoinResources/CoinResources';
import { Store } from '../../Store';
import { CoinChart } from '../../Components/CoinChart/CoinChart';
import { setChartDataInterval } from '../../helpers/dateHelpers';
import { fetchAssetMetricsData, fetchAssetPriceData, fetchAssetProfileData } from '../../apis/messari';
import PriceLinePoint from '../../PriceLinePoint';
import './CoinProfile.scss';
import ICoinProfileData from '../../interfaces/ICoinProfileData';

export const CoinProfile = (): JSX.Element => {
	const { gState, dispatch } = useContext(Store);
	const { currentCoin, errorMsg } = gState;
	const [coinProfileData, setCoinProfileData] = useState<ICoinProfileData | undefined>();
	const [coinMetricsData, setCoinMetricsData] = useState(null);
	const [chartData, setChartData] = useState<Array<PriceLinePoint>>();
	const [numDaysPriceData, setNumDaysPriceData] = useState(30)

	// calc today's date and num days in the past to get data for based on user input
	const [today, maxInterval] = setChartDataInterval(numDaysPriceData)

	useEffect(() => {

		const getCoinData = async () => {
			const profile = await fetchAssetProfileData(currentCoin, dispatch);
			const metrics = await fetchAssetMetricsData(currentCoin, dispatch);
			const priceData = await fetchAssetPriceData(currentCoin, dispatch, today, maxInterval)
			setCoinProfileData(profile)
			setCoinMetricsData(metrics)
			setChartData(priceData)
		}

		getCoinData();

	}, [currentCoin, maxInterval, dispatch, today]);

	const coinProfile = errorMsg === '' ? (<><div className='coin-profile'>
		<div className='coin-summary-cont'>
			<CoinImg />
			<CoinSummary
				coinMetricsData={coinMetricsData}
				coinProfileData={coinProfileData}
			/>
		</div>
		<CoinDescription coinProfileData={coinProfileData} />
		<CoinResources coinProfileData={coinProfileData} />
		<CoinChart chartData={chartData} today={today} numDaysPriceData={numDaysPriceData} setNumDaysPriceData={setNumDaysPriceData} />
	</div></>) : <div>{errorMsg}</div>

	return (
		<div>
			{coinProfile}
		</div>
	);
};

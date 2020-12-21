import React, { useState, useContext, useEffect } from 'react';
import './CoinProfile.scss';
import { CoinSummary } from '../../Components/CoinSummary/CoinSummary';
import { CoinImg } from '../../Components/CoinImg/CoinImg';
import { CoinDescription } from '../../Components/CoinDescription/CoinDescription';
import { CoinResources } from '../../Components/CoinResources/CoinResources';
import { CoinContext } from '../../App';
import PriceLinePoint from '../../PriceLinePoint';
import { CoinChart } from '../../Components/CoinChart/CoinChart';
import { setChartDataInterval } from '../../helpers/dateHelpers';
import { fetchAssetMetricsData, fetchAssetProfileData } from '../../apis/messari';

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

	const promiseArray = [
		fetch(`https://data.messari.io/api/v2/assets/${currentCoin}/profile`, {
			headers: {
				method: 'GET',
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-messari-api-key': REACT_APP_MESSARI_API_KEY,
			},
		}),
		fetch(`https://data.messari.io/api/v1/assets/${currentCoin}/metrics`, {
			headers: {
				method: 'GET',
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-messari-api-key': REACT_APP_MESSARI_API_KEY,
			},
		})
	];

	useEffect(() => {

		const getCoinData = async () => {
			const profile = await fetchAssetProfileData(currentCoin);
			const metrics = await fetchAssetMetricsData(currentCoin);
			setCoinProfileData(profile)
			setCoinMetricsData(metrics)
		}
		
		getCoinData();

		const fetchPriceData = () => {
		fetch(
			// NEED TO CHANGE THIS URL TO TAKE DYNAMIC INPUT FOR START AND END (and maybe interval?)
			`https://data.messari.io/api/v1/assets/${currentCoin}/metrics/price/time-series?start=${maxInterval}&${today}&interval=1d`,

			{
			headers: {
				method: "GET",
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-messari-api-key": REACT_APP_MESSARI_API_KEY
			}
			}
		)
			.then((response) => {
			if (response.status === 404) {
				setGState({...gState, errorMsg: `No data found for ${currentCoin}, please check your input or select an option from the list.`});
			} else {
				setGState({...gState, errorMsg: ''});
				return response.json();
			}
			})
			.then((data) => {
			// get the array of Open/High/Low/Close/Volume (OHLCV) from Messari for the given dates in the 3rd fetch above
			if (data) {
				const pricesArray = data.data.values;
				// each item in the array stored at dataObjects[2].data.values is a day's worth of OHLCV data (in form of an array)
				//the data we're interested in is the timestamp and the close price for each day
				// timestamp is index 0 of the OHLCV array, the close price is index 4
				const daysTimestampClose = [];
				pricesArray.forEach((day, index) => {
					// create a new PriceLinePoint instance for each day in the OHLCV array and push it to the daysTimestampClose array
					daysTimestampClose.push(new PriceLinePoint(day[0], day[4].toFixed(2)));
				});
				return setChartData(daysTimestampClose);
			}
		});
		}
		fetchPriceData();
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

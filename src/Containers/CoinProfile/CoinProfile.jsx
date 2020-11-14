import React, { useState, useContext, useEffect } from 'react';
import './CoinProfile.scss';
import { CoinSummary } from '../../Components/CoinSummary/CoinSummary';
import { CoinImg } from '../../Components/CoinImg/CoinImg';
import { CoinDescription } from '../../Components/CoinDescription/CoinDescription';
import { CoinResources } from '../../Components/CoinResources/CoinResources';
import { CoinMarketData } from '../../Components/CoinMarketData/CoinMarketData'
import { CoinContext } from '../../App';
import PriceLinePoint from '../../PriceLinePoint';

///////// need to hide this with netlify functions ////////////
const MESSARI_API_KEY = '9ada99d9-1714-4298-b5b8-3c5330af5498';

export const CoinProfile = () => {
	let currentCoin = useContext(CoinContext);
	const [coinProfileData, setCoinProfileData] = useState(null);
	const [coinMetricsData, setCoinMetricsData] = useState(null);
	const [chartData, setChartData] = useState();

	const today = setChartDataInterval()[0]
	const maxInterval= setChartDataInterval()[1]

	console.log('today: ', today)
	console.log('last year: ', maxInterval)

	const promiseArray = [
		fetch(`https://data.messari.io/api/v2/assets/${currentCoin}/profile`, {
			headers: {
				method: 'GET',
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-messari-api-key': MESSARI_API_KEY,
			},
		}),
		fetch(`https://data.messari.io/api/v1/assets/${currentCoin}/metrics`, {
			headers: {
				method: 'GET',
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'x-messari-api-key': MESSARI_API_KEY,
			},
		})
	];

	useEffect(() => {
		function fetchAssetData() {
			Promise.all(promiseArray)
				.then((responses) => {
					return Promise.all(
						responses.map((response) => {
							if (response.status === 404) {
								alert(
									`No data found for ${currentCoin}, please check your input or select an option from the list.`
								);
								return document.location.reload();
							} else {
								return response.json();
							}
						})
					);
				})
				.then((dataObjects) => {
					return (
						setCoinProfileData(dataObjects[0].data),
						setCoinMetricsData(dataObjects[1].data)
					);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		fetchAssetData();

		function fetchPriceData() {
		fetch(
			// NEED TO CHANGE THIS URL TO TAKE DYNAMIC INPUT FOR START AND END (and maybe interval?)
			`https://data.messari.io/api/v1/assets/${currentCoin}/metrics/price/time-series?start=${maxInterval}&${today}&interval=1d`,
			// `https://data.messari.io/api/v1/assets/${currentCoin}/metrics/price/time-series?start=${maxDaysAgo}&${today}}&interval=1d`,
			{
			headers: {
				method: "GET",
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-messari-api-key": MESSARI_API_KEY
			}
			}
		)
			.then((response) => {
			if (response.status === 404) {
				alert(
				`No data found for ${currentCoin}, please check your input or select an option from the list.`
				);
				return document.location.reload();
			} else {
				return response.json();
			}
			})
			.then((data) => {
			// get the array of Open/High/Low/Close/Volume (OHLCV) from Messari for the given dates in the 3rd fetch above
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
			});
		}
			fetchPriceData();
	}, [currentCoin]);

	return (
		<div className='coin-profile'>
			<div className='coin-summary-cont'>
				<CoinImg className='coin-img-comp' coinProfileData={coinProfileData} />
				<CoinSummary
					coinMetricsData={coinMetricsData}
					coinProfileData={coinProfileData}
				/>
			</div>
			<CoinDescription coinProfileData={coinProfileData} />
			<CoinResources coinProfileData={coinProfileData} />
			<CoinMarketData chartData={chartData} today={today} maxDaysAgo={maxInterval}/>
		</div>
	);
};

// calculate 1 today's date and 1 year ago today, return them as strings
function setChartDataInterval() {
	// get todays date and format as API-friendly string
	let now = new Date()
	let todayDate = now.getUTCDate()
	let todayMonth = now.getUTCMonth() + 1
	let thisYear = now.getUTCFullYear()

	// get max # of days ago that API call returns data for (256 days aka ~8 months) and format as API-friendly string
	const past = new Date()
	console.log('past', past)
	let maxDaysAgo = past.setDate((past.getDate() - 258))
	let maxDaysAgoDate = past.getDate()
	let maxDaysAgoMonth = past.getMonth() + 1
	let maxDaysAgoYear = past.getUTCFullYear()
	

	if (todayDate < 10) {
		todayDate = "0" + todayDate.toString()
	}

	if (todayMonth < 10) {
		todayMonth = "0" + todayMonth.toString()
	}

	if (maxDaysAgoDate < 10) {
		maxDaysAgoDate = "0" + maxDaysAgoDate.toString()
	} 

	if (maxDaysAgoMonth < 10) {
		maxDaysAgoMonth = "0" + maxDaysAgoMonth.toString()
	} else {}

	let today = `${thisYear}-${todayMonth}-${todayDate}` 
	let maxInterval = `${maxDaysAgoYear}-${maxDaysAgoMonth}-${maxDaysAgoDate}` 

	console.log(maxInterval)
	console.log(today)

	return [today, maxInterval]
	}
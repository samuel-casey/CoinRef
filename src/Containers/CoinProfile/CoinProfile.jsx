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

	// calculate 1 year of chart data to show
	function setChartDataInterval() {
		let now = new Date()
		let todayDate = now.getUTCDate()
		let todayMonth = now.getUTCMonth() + 1
		let thisYear = now.getUTCFullYear()
		let lastYear = now.getUTCFullYear() - 1
		
		if (todayDate < 10) {
			todayDate = "0" + todayDate.toString()
		}

		if (todayMonth < 10) {
			todayMonth = "0" + todayMonth.toString()
		}

		let today = `${thisYear}-${todayMonth}-${todayDate}` 
		let todayLastYear = `${lastYear}-${todayMonth}-${todayDate}` 
		

		return [today, todayLastYear]
	}

	const today = setChartDataInterval()[0]
	const todayLastYear = setChartDataInterval()[1]

	// console.log('today: ', today)
	// console.log('last year: ', lastYear)

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
			`https://data.messari.io/api/v1/assets/${currentCoin}/metrics/price/time-series?start=${todayLastYear}&${today}}&interval=1d`,
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
					className='coin-summary-comp'
					coinMetricsData={coinMetricsData}
					coinProfileData={coinProfileData}
				/>
			</div>
			<CoinDescription coinProfileData={coinProfileData} />
			<CoinResources coinProfileData={coinProfileData} />
			<CoinMarketData chartData={chartData}/>
		</div>
	);
};

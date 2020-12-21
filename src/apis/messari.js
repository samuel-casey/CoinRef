import axios from 'axios';
import PriceLinePoint from '../PriceLinePoint';
const { REACT_APP_MESSARI_API_KEY } = process.env;

export const fetchAssetProfileData = async (currentCoin, gState, setGState) => {
	try {
		setGState({
			...gState,
			errorMsg: '',
		});
		const profile = await axios.get(
			`https://data.messari.io/api/v2/assets/${currentCoin}/profile`,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-messari-api-key': REACT_APP_MESSARI_API_KEY,
				},
			}
		);
		return profile.data.data;
	} catch (error) {
		console.log(error);
		setGState({
			...gState,
			errorMsg: `No profile data found for ${currentCoin}, please check your input or select an option from the list.`,
		});
	}
};

export const fetchAssetMetricsData = async (currentCoin, gState, setGState) => {
	try {
		setGState({
			...gState,
			errorMsg: '',
		});
		const metrics = await axios.get(
			`https://data.messari.io/api/v1/assets/${currentCoin}/metrics`,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-messari-api-key': REACT_APP_MESSARI_API_KEY,
				},
			}
		);
		return metrics.data.data;
	} catch (error) {
		console.log(error);
		setGState({
			...gState,
			errorMsg: `No metrics data found for ${currentCoin}, please check your input or select an option from the list.`,
		});
	}
};

export const fetchAssetPriceData = async (
	currentCoin,
	today,
	maxInterval,
	gState,
	setGState
) => {
	try {
		setGState({
			...gState,
			errorMsg: '',
		});
		const res = await axios.get(
			`https://data.messari.io/api/v1/assets/${currentCoin}/metrics/price/time-series?start=${maxInterval}&${today}&interval=1d`,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-messari-api-key': REACT_APP_MESSARI_API_KEY,
				},
			}
		);

		const pricesArray = res.data.data.values;

		const daysTimestampClose = [];
		pricesArray.forEach((day, index) => {
			// create a new PriceLinePoint instance for each day in the OHLCV array and push it to the daysTimestampClose array
			daysTimestampClose.push(new PriceLinePoint(day[0], day[4].toFixed(2)));
		});
		return daysTimestampClose;
	} catch (error) {
		console.log(error);
		setGState({
			...gState,
			errorMsg: `No price data found for ${currentCoin}, please check your input or select an option from the list.`,
		});
	}
};

export const fetchAssetNewsArticles = async (
	currentCoin,
	gState,
	setGState
) => {
	try {
		setGState({
			...gState,
			errorMsg: '',
		});
		const res = await axios.get(
			`https://data.messari.io/api/v1/news/${currentCoin}`,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-messari-api-key': REACT_APP_MESSARI_API_KEY,
				},
			}
		);
		return res.data.data;
	} catch (error) {
		console.log(error);
		setGState({
			...gState,
			errorMsg: `No price news articles found for ${currentCoin}, please check your input or select an option from the list.`,
		});
	}
};
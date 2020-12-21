import axios from 'axios';
const { REACT_APP_MESSARI_API_KEY } = process.env;

export const fetchAssetProfileData = async (currentCoin) => {
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
};

export const fetchAssetMetricsData = async (currentCoin) => {
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
};

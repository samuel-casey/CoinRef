export default class PriceLinePoint {
	constructor(timestamp, closePrice) {
		this.timestamp = timestamp;
		this.date = `${new Date(timestamp).getMonth() + 1}/${new Date(
			timestamp
		).getDate()}/${new Date(timestamp).getFullYear()}`;
		this.closePrice = closePrice;
	}
}

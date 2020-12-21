// HELPER FUNCTION TO TURN MONTH AS NO. TO MONTH AS ABBR.
export const monthEstToAbbr = (monthEst) => {
	switch (monthEst) {
		case 0:
			return 'Jan,';
		case 1:
			return 'Feb,';
		case 2:
			return 'Mar,';
		case 3:
			return 'Apr,';
		case 4:
			return 'May,';
		case 5:
			return 'Jun,';
		case 6:
			return 'Jul,';
		case 7:
			return 'Aug,';
		case 8:
			return 'Sep,';
		case 9:
			return 'Oct,';
		case 10:
			return 'Nov,';
		case 11:
			return 'Dec,';
		default:
			return 'N/A';
	}
}

// calculate 1 today's date and 1 year ago today, return them as strings
export const setChartDataInterval = (numDaysPriceData) => {
	// get todays date and format as API-friendly string
	let now = new Date()
	let todayDate = now.getUTCDate()
	let todayMonth = now.getUTCMonth() + 1
	let thisYear = now.getUTCFullYear()

	// get max # of days ago that API call returns data for (256 days aka ~8 months) and format as API-friendly string
	const past = new Date()
	past.setDate((past.getDate() - numDaysPriceData))
	let maxDaysAgoDate = past.getDate()
	let maxDaysAgoMonth = past.getMonth() + 1
	let maxDaysAgoYear = past.getUTCFullYear()

	if (todayDate < 10) todayDate = "0" + todayDate.toString()

	if (todayMonth < 10) todayMonth = "0" + todayMonth.toString()

	if (maxDaysAgoDate < 10) maxDaysAgoDate = "0" + maxDaysAgoDate.toString()

	if (maxDaysAgoMonth < 10) maxDaysAgoMonth = "0" + maxDaysAgoMonth.toString()

	let today = `${thisYear}-${todayMonth}-${todayDate}` 
	let maxInterval = `${maxDaysAgoYear}-${maxDaysAgoMonth}-${maxDaysAgoDate}` 
	
	return [today, maxInterval]
}
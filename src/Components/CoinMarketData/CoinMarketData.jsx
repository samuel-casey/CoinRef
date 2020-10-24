import React from "react"

export const CoinMarketData = ({chartData}) => {
    const loaded = chartData ? (
        chartData.map((day, index) => {
            console.log(day)
            return [day.date, day.closePrice]
        })
    ) : null;

    const loading = "Loading price data..."

    return chartData ? loaded : loading
}
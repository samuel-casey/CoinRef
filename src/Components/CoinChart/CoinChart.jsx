import React, { useRef, useEffect, useContext } from "react";
import {CoinContext} from '../../App'
import Chart from 'chart.js'
import "./CoinChart.scss"


export const CoinChart = ({chartData, maxDaysAgo, today}) => {
    const svgRef = useRef();
    const currentCoin = useContext(CoinContext)

    const chartWidth = window.innerWidth * 0.8
    const pathWidth = chartWidth * 0.9
    const yAxisWidth = chartWidth - pathWidth
    const chartHeight = chartWidth * 0.5

    const pricesOnly = chartData ? chartData.map((day, index) => {
        return parseInt(day.closePrice)
    }) : null;

    const prepareLineData = (data) => {
		const lineChartData = {
			labels: [],
			datasets: [
				{
					label: "Day's Avg. Price (USD)",
					data: [],
					borderColor: '#FFB3B3',
					backgroundColor: '#FFFFFF',
				},
			],
        };

		data.forEach((point) => {
			lineChartData.labels.push(point.date);
			lineChartData.datasets[0].data.push(point.closePrice);
		});

		return lineChartData;
	};

    const createLineChart = (data) => {
		const canvas = document.querySelector('#lineChart');
		const priceChart = new Chart(canvas, {
			type: 'line',
			data: data,
		});
	};

    // let uniqueMonths = []
    // const monthsOnly = chartData ? chartData.forEach((day, index) => {
    //     const month = new Date(day.timestamp).toLocaleString([], {year: 'numeric', month: 'numeric'})
    //     if (!uniqueMonths.includes(month)) {
    //         uniqueMonths.push(month)
    //     }
    //     return uniqueMonths
    // }) : null;
            
    useEffect(() => {

        const drawChart = async () => {
            try {
                const formattedData = await prepareLineData(chartData)
                createLineChart(formattedData)
                console.log(chartData)
            } catch (err) {
                console.log(err)
            }
        }

        drawChart()   

    }, [chartData, today, maxDaysAgo])

    const loading = "Loading price data..."
    

    if (chartData && currentCoin) {
        return (
            <div className="price-chart">
                <h4>{currentCoin ? currentCoin.toUpperCase() : "Loading"} Price Chart (USD)</h4>
                    <p>from {maxDaysAgo} to {today}</p>
                <div id="chart">
                        <canvas id='lineChart' width='300' height='100'></canvas>
                </div>
            </div>    
                ) 
    }
    else {
        return loading
    }
}

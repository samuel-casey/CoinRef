import React, { useState, useEffect, useContext } from "react";
import {CoinContext} from '../../App'
import Chart from 'chart.js'
import "./CoinChart.scss"


export const CoinChart = ({chartData, numDaysPriceData, setNumDaysPriceData, today}) => {
    const currentCoin = useContext(CoinContext)

    const chartWidth = window.innerWidth * 0.8
    const pathWidth = chartWidth * 0.9
    const yAxisWidth = chartWidth - pathWidth
    const chartHeight = chartWidth * 0.5

    const pricesOnly = chartData ? chartData.map((day, index) => {
        return parseInt(day.closePrice)
    }) : null;

    const [selectedOption, setSelectedOption] = useState('180')

    const prepareLineData = (data) => {
		const lineChartData = {
			labels: [],
			datasets: [
				{
					label: "USD/BTC as of 4PM EST",
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
            } catch (err) {
                console.log(err)
            }
        }

        drawChart()   

    }, [chartData])

    const loading = "Loading price data..."

    const handleChange = (e) => {
        e.preventDefault()
        setSelectedOption(e.target.name)
        
        // coerce e.target.name's type to number
        const newNumDays = e.target.name * 1
        
        setNumDaysPriceData(newNumDays)
    }
    

    if (chartData && currentCoin) {
        return (
            <div className="price-chart">
                <h4>{currentCoin ? currentCoin.toUpperCase() : "Loading"} Price in USD as of 4PM EST</h4>
                <h3>Time interval</h3>
                    <button className={`chart-btn ${selectedOption === '30' ? 'selected' : 'not-selected'}`} name='30' onClick={handleChange} value='30'>1 mo</button>
                    <button className={`chart-btn ${selectedOption === '90' ? 'selected' : 'not-selected'}`} name='90' onClick={handleChange} value='90'>3 mos</button>
                    <button className={`chart-btn ${selectedOption === '180' ? 'selected' : 'not-selected'}`} name='180'onClick={handleChange} value='180'>6 mos</button>
                    <button className={`chart-btn ${selectedOption === '256' ? 'selected' : 'not-selected'}`} name='256' onClick={handleChange} value='256'>Max</button>
        <p className='past-days'>past {numDaysPriceData} days</p>
        <p className='max-days-note'>{numDaysPriceData === 256 ? "CoinRef's current data source only provides a maximum of 256 days of data" : null}</p>
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

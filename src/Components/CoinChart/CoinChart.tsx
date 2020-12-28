import React, { useState, useEffect, useContext } from "react";
import { Store } from '../../Store'
import Spinner from 'react-bootstrap/Spinner';
import Chart, { ChartData } from 'chart.js'
import "./CoinChart.scss"
import ICoinChartProps from "../../interfaces/props/ICoinChartProps";

// add priceChart to global namespace for use in createLineChart fn
declare global {
    interface Window { priceChart: any; }
}

export const CoinChart = ({ chartData, numDaysPriceData, setNumDaysPriceData, today }: ICoinChartProps): JSX.Element => {
    const { gState } = useContext(Store);
    const { currentCoin } = gState;

    const [selectedOption, setSelectedOption] = useState('30')

    const prepareLineData = (data: any) => {
        const lineChartData: any = {
            labels: [],
            datasets: [
                {
                    label: "USD/BTC as of 4PM EST",
                    data: [],
                    borderColor: '#de611a',
                    backgroundColor: '#FFFFFF00',
                },
            ],
        };

        // POINT SHOULD NOT = ANY !!!!!!!
        if (data) data.forEach((point: any) => {
            lineChartData.labels.push(point.date);
            lineChartData.datasets[0].data.push(point.closePrice);
        });

        return lineChartData;
    };

    const createLineChart = (data: ChartData) => {
        const canvas = document.querySelector('#line-chart');
        let priceChart
        if (window.priceChart !== undefined) {
            window.priceChart.destroy();
            window.priceChart = new Chart(canvas as any, {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                // Include a dollar sign in the ticks
                                callback: function (value: number) {
                                    value = +value > 100 ? +value.toFixed(0) : +value.toFixed(2)
                                    value = +value.toString();
                                    return '$' + value;
                                }
                            }
                        }]
                    }
                }

            });
        } else {
            window.priceChart = new Chart(canvas as any, {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                // Include a dollar sign in the ticks
                                callback: function (value: number) {
                                    value = +value > 100 ? +value.toFixed(0) : +value.toFixed(2)
                                    value = +value.toString();
                                    return '$' + value;
                                }
                            }
                        }]
                    }
                }
            })
        }
        return priceChart
    }


    useEffect(() => {

        const drawChart = async () => {
            try {
                const formattedData = await prepareLineData(chartData)
                createLineChart(formattedData)
            } catch (err) {
                console.log(err)
            }
        }

        if (chartData) drawChart();

    }, [chartData])

    const loading = <><p>Loading price data...</p><Spinner animation='border' variant='info' /></>

    const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setSelectedOption(e.currentTarget.name)

        // coerce e.target.name's type to number
        const newNumDays = +e.currentTarget.name
        setNumDaysPriceData(newNumDays)
    }

    if (chartData && currentCoin) {
        return (
            <div className="price-chart">
                <h4>4PM EST Price of {currentCoin ? currentCoin.toUpperCase() : "Loading"} in $</h4>
                <div className='interval-container'>
                    <span className='interval-label'>Time period</span>
                    <button className={`chart-btn ${selectedOption === '30' ? 'selected' : 'not-selected'}`} name='30' onClick={handleChange} value='30'>1 mo</button>
                    <button className={`chart-btn ${selectedOption === '90' ? 'selected' : 'not-selected'}`} name='90' onClick={handleChange} value='90'>3 mos</button>
                    <button className={`chart-btn ${selectedOption === '180' ? 'selected' : 'not-selected'}`} name='180' onClick={handleChange} value='180'>6 mos</button>
                    <button className={`chart-btn ${selectedOption === '256' ? 'selected' : 'not-selected'}`} name='256' onClick={handleChange} value='256'>Max</button>
                </div>
                <p className='past-days'>past {numDaysPriceData} days</p>
                <p className='max-days-note'>{numDaysPriceData === 256 ? "CoinRef's current data source only provides a maximum of 256 days of data" : null}</p>
                <div id="chart">
                    <canvas id='line-chart'></canvas>
                </div>
            </div>
        )
    }
    else {
        return <div>{loading}</div>
    }
}

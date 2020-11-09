import React, { useRef, useEffect, useContext, useState } from "react";
import { select, line, curveCardinal, axisBottom, axisLeft, scaleLinear, timeDay, timeMonth, scaleTime } from "d3";
import "./CoinMktData.scss"
import {min, max} from "d3"
import {CoinContext} from '../../App'
import { isCompositeComponent } from "react-dom/test-utils";

export const CoinMarketData = ({chartData}) => {
    const svgRef = useRef();
    const currentCoin = useContext(CoinContext)

    const chartWidth = window.innerWidth * 0.8
    const pathWidth = chartWidth * 0.9
    const yAxisWidth = chartWidth - pathWidth
    const chartHeight = chartWidth * 0.5

    const pricesOnly = chartData ? chartData.map((day, index) => {
        return parseInt(day.closePrice)
    }) : null;

    let uniqueMonths = []
    const monthsOnly = chartData ? chartData.forEach((day, index) => {
        const month = new Date(day.timestamp).toLocaleString([], {year: 'numeric', month: 'numeric'})
        if (!uniqueMonths.includes(month)) {
            uniqueMonths.push(month)
        }
        return uniqueMonths
    }) : null;
            
    useEffect(() => {

        const svg = select(svgRef.current);

        if (pricesOnly) {
        const xScale = scaleLinear()
        .domain([0,pricesOnly.length - 1])
        .range([yAxisWidth,pathWidth])

        const yScale = scaleLinear()
        .domain([min(pricesOnly), max(pricesOnly)])
        .range([chartHeight, 0])

        const yAxis = axisLeft(yScale)
        .tickSize(-chartWidth + yAxisWidth + 20)


        svg.select(".y-axis").call(yAxis).attr("transform", `translate(${yAxisWidth - 10},0)`)
        const xAxis = axisBottom(xScale)
        .ticks() // this gets approx # of months 
        .tickFormat((day, index) => uniqueMonths[index])

        svg.select(".x-axis").call(xAxis).attr("transform", `translate(0,${chartHeight + 10})`)

        const myLine = line()
        .x((value, index) => xScale(index))
        .y(value => yScale(value))
        .curve(curveCardinal)

        svg
        .selectAll("path")
        .data([pricesOnly])
        .join("path")
        .attr("d", value => myLine(value))
        .attr("fill", "none")
        .attr("stroke", "orange")
        }
            
    }, [chartData])

    const loading = "Loading price data..."

    if (chartData && currentCoin) {
        return (
            <div className="price-chart">
                <h4>{currentCoin ? currentCoin.toUpperCase() : "Loading"} Price Chart (USD)</h4>
                <div id="chart">
                        <svg width={chartWidth} height={chartHeight} ref={svgRef}>
                            <path></path>
                            <g className="y-axis" />
                            <g className="x-axis" />
                        </svg>
                </div>
            </div>    
                ) 
    }
    else {
        return loading
    }
}

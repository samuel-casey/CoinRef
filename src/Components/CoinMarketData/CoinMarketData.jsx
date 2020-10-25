import React, { useRef, useEffect, useContext, useState } from "react";
import { select, line, curveCardinal, axisBottom, axisLeft, scaleLinear } from "d3";
import "./CoinMktData.scss"
import {min, max} from "d3"
import {CoinContext} from '../../App'
import { isCompositeComponent } from "react-dom/test-utils";

export const CoinMarketData = ({chartData}) => {
    const svgRef = useRef();
    const currentCoin = useContext(CoinContext)

    // const chartWidth = window.innerWidth * 0.85
    // const chartHeight = chartWidth * 0.9

    const chartWidth = 300
    const chartHeight = 150

    const pricesOnly = chartData ? chartData.map((day, index) => {
        return parseInt(day.closePrice)
    }) : null;

    const datesOnly = chartData ? chartData.map((day, index) => {
        return new Date(day.timestamp).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric'})
    }) : null;
            
    useEffect(() => {
        // updateDimensions()

        const svg = select(svgRef.current);

        if (pricesOnly) {
        const xScale = scaleLinear()
        .domain([0,pricesOnly.length - 1])
        .range([0,chartWidth])
        
        const yScale = scaleLinear()
        .domain([min(pricesOnly), max(pricesOnly)])
        .range([chartHeight, 0])

        const yAxis = axisLeft(yScale)
        svg.select(".y-axis").call(yAxis).style("transform", "translateX(100,0)")

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
            <div id="chart-title">
                <h4>{currentCoin ? currentCoin.toUpperCase() : "Loading"} Price Chart</h4>
                <div id="chart">
                        <svg ref={svgRef}>
                            <path></path>
                            <g className="y-axis" />
                        </svg>
                </div>
            </div>    
                ) 
    }
    else {
        return loading
    }
}

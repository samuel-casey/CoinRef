import React, { useRef, useEffect } from "react";
import { select, line, curveCardinal } from "d3";
import "./CoinMktData.scss"

export const CoinMarketData = ({chartData}) => {
    const svgRef = useRef();

    
    
    // const loaded = chartData ? (
        //     chartData.map((day, index) => {
            //         return day.closePrice
            //     })
            // ) : null;
            
    const sampleData = [10,20,15,60,50, 100, 200, 1000]
            
    useEffect(() => {
        const svg = select(svgRef.current);
        const myLine = line()
        .x((value, index) => index * 50)
        .y(value => 335 - value)
        .curve(curveCardinal)

        svg
        .selectAll("path")
        .data([sampleData])
        .join("path")
        .attr("d", value => myLine(value))
        .attr("fill", "none")
        .attr("stroke", "orange")
    }, [chartData])

    const loading = "Loading price data..."

    return chartData 
    ? <div id="chart"><svg ref={svgRef}><path></path></svg></div> 
    : loading
}



/// D3 Helper Functions
function myLine(pointData) {
  if (pointData) {
    return line()
      .x((pointData, index) => index * 50)
      .y((pointData) => 200 - pointData)
      .curve(curveCardinal);
  } else {
    return line()
      .x((pointData, index) => index * 50)
      .y((pointData) => 200 - pointData)
      .curve(curveCardinal);
  }
}

function plotPoints(pointData) {
  if (pointData) {
    return myLine(pointData);
  } else {
    return myLine([100, 20, 120, 40, 50]);
  }
}
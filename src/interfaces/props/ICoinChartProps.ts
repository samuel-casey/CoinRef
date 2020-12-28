import PriceLinePoint from "../../PriceLinePoint";

export default interface ICoinChartProps {
    chartData: PriceLinePoint[] | undefined;
    numDaysPriceData: number;
    setNumDaysPriceData: Function;
    today: string;
}
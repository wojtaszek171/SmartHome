import React, { FC } from 'react';
import './LineChart.scss';

interface LineChartProps {
    values: number[];
}

const LineChart: FC<LineChartProps> = ({ values }) => {

    const HEIGHT = 100;
    const WIDTH = 500;

    const valuesToPoints = () => {
        let values2 = values.map(val => val*-1);

        const min = Math.min(...values2);
        const max = Math.max(...values2);
        const maxDiff = Math.abs(max - min);
        const yPoints = values2.map(val => val + Math.abs(min));
        console.log(yPoints);
        
        const scale = HEIGHT / Math.abs(maxDiff) / 2;
        
        let points = '\n';
        const widthToAdd = 500 / yPoints.length;
        let previous = widthToAdd/2;

        yPoints.forEach(value => {
            points += `${previous}, ${value * scale - 5 + HEIGHT / 4}\n`;
            previous += widthToAdd;
        });

        return points;
    };

    return (
        <div className='pwd-line-chart'>
            <svg width="100%" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="chart">
                <polyline
                    fill="none"
                    stroke="#0074d9"
                    stroke-width="3"
                    points={valuesToPoints()}
                    width='100%'
                    height='100%'
                />
                
                </svg>
        </div>
    );
}

export default LineChart;

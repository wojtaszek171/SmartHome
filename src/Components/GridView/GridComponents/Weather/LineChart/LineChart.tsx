import React, { FC } from 'react';
import './LineChart.scss';

interface LineChartProps {
    values: number[];
}

const HEIGHT = 100;
const WIDTH = 500;

const LineChart: FC<LineChartProps> = ({ values }) => {
    const valuesToPoints = () => {
        const invertedValues = values.map(val => val*-1);

        const min = Math.min(...invertedValues);
        const max = Math.max(...invertedValues);
        const maxDiff = Math.abs(max - min);
        const yPoints = invertedValues.map(val => val + Math.abs(min));
        
        const scale = HEIGHT / Math.abs(maxDiff) / 2;
        
        let points = '\n';
        const widthToAdd = WIDTH / yPoints.length;
        let previous = widthToAdd/2;

        yPoints.forEach(value => {
            points += `${previous}, ${value * scale - 5 + HEIGHT / 4}\n`;
            previous += widthToAdd;
        });

        return points;
    };

    const valuesToBg = () => {
        const invertedValues = values.map(val => val*-1);

        const min = Math.min(...invertedValues);
        const max = Math.max(...invertedValues);
        const maxDiff = Math.abs(max - min);
        const yPoints = [0, ...invertedValues, 0].map(val => val + Math.abs(min));
        
        const scale = HEIGHT / Math.abs(maxDiff) / 2;
        
        let points = '\n';
        const widthToAdd = WIDTH / (yPoints.length - 2);
        let previous = widthToAdd/2;

        yPoints.forEach((value, index) => {
            if (index === 0) {
                points += `${previous}, ${value * scale - 5 + HEIGHT / 4}\n`;
            } else if (index === yPoints.length - 1) {
                points += `${previous - widthToAdd}, ${value * scale - 5 + HEIGHT / 4}\n`;
            } else {
                points += `${previous}, ${value * scale - 5 + HEIGHT / 4}\n`;
                previous += widthToAdd;
            }
        });

        return points;
    };

    return (
        <div className='pwd-line-chart'>
            <svg width='100%' viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className='chart'>
                <polyline
                    fill='none'
                    stroke='#0074d9'
                    strokeWidth='3'
                    points={valuesToPoints()}
                    width='100%'
                    height='100%'
                />
                <polyline
                    fill='#4864a9a8'
                    stroke='#0074d9'
                    strokeWidth='0'
                    points={valuesToBg()}
                    width='100%'
                    height='100%'
                />
                </svg>
        </div>
    );
}

export default LineChart;

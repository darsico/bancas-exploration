import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { parliamentChart } from 'd3-parliament-chart';
import './parliamentChartD3.css';
const inputData = [
  {
    party: 'Democratic Party',
    seats: 52,
    color: '#636cbb',
    id: '2',
  },
  {
    party: 'Republican Party',
    seats: 39,
    color: '#26d050',
    id: '3',
  },
  {
    party: 'Green Party',
    seats: 67,
    color: '#315cee',
    id: '4',
  },
  {
    party: 'Socialist Party',
    seats: 26,
    color: '#ff0000',
    id: '5',
  },
  {
    party: 'Libertarian Party',
    seats: 23,
    color: '#f8e71c',
    id: '6',
  },
  {
    party: 'Progressive Party',
    seats: 19,
    color: '#8c2a9a',
    id: '7',
  },
];

const ParliamentChart = () => {
  const chartRef = useRef(null);
  const legendRef = useRef(null);

  const createParliamentChart = (container, data) => {
    return parliamentChart().width(800).aggregatedData(data).sections(2).seatRadius(10).sectionGap(4).rowHeight(42);
  };

  const appendChart = (container, chart) => {
    container.append('g').call(chart);
  };

  const generateLegend = (container, data) => {
    const legendHtml = data
      .map(
        ({ seats, color, party, id }) => `
        <button class="legend-item" data-color="${color}" data-id='${id}' style='border:1px solid ${color}'>
          <span style="border-radius: 50px; width: 8px; height: 8px; background-color: ${color}; display: inline-block;"></span>
          <p class="legend-item-party-text">${party}</p>
          <span class="legend-item-party-seats-qty"> (${seats})</span>
        </button>
      `
      )
      .join('');

    container.html(legendHtml);
  };

  const addHoverInteraction = (chartContainer, legendContainer) => {
    const legendItems = legendContainer.selectAll('.legend-item');

    legendItems.on('mouseover', function () {
      const selectedColor = d3.select(this).attr('data-color');
      const selectedId = inputData.find((item) => item.color === selectedColor).id;

      chartContainer.selectAll('circle').style('opacity', function () {
        const circleColor = d3.select(this).attr('fill');
        const circleId = inputData.find((item) => item.color === circleColor).id;

        return circleColor === selectedColor && circleId === selectedId ? 1 : 0.1;
      });
    });

    legendItems.on('mouseout', function () {
      chartContainer.selectAll('circle').style('opacity', 1);
    });
  };

  const addHoverInteractionOnCircles = (chartContainer) => {
    const circles = chartContainer.selectAll('circle');

    circles.on('mouseover', function () {
      const selectedColor = d3.select(this).attr('fill');
      const selectedId = inputData.find((item) => item.color === selectedColor).id;

      chartContainer.selectAll('circle').style('opacity', function () {
        const circleColor = d3.select(this).attr('fill');
        const circleId = inputData.find((item) => item.color === circleColor).id;

        return circleColor === selectedColor && circleId === selectedId ? 1 : 0.1;
      });
    });

    circles.on('mouseout', function () {
      chartContainer.selectAll('circle').style('opacity', 1);
    });
  };

  useEffect(() => {
    const chartContainer = d3.select(chartRef.current);
    const legendContainer = d3.select(legendRef.current);

    const chart = createParliamentChart(chartContainer, inputData);

    appendChart(chartContainer, chart);
    generateLegend(legendContainer, inputData);
    addHoverInteraction(chartContainer, legendContainer);
    addHoverInteractionOnCircles(chartContainer);
  }, []);

  return (
    <div style={{ maxWidth: 1028 }} className="chart-ctn">
      <div style={{ position: 'relative' }}>
        <svg id="pchart" ref={chartRef} width="100%" viewBox="0 0 800 500" />

        <div className="total-seats-ctn">
          <spa className="total-seats-value">256</spa>
          <span className="total-seats-text">Bancas totales</span>
        </div>
      </div>
      <div className="chart-legend-ctn" ref={legendRef}></div>
    </div>
  );
};

export default ParliamentChart;

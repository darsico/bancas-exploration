import { useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsItem from 'highcharts/modules/item-series';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';

// Initialize the required modules
HighchartsItem(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsAccessibility(Highcharts);

const renderCustomText = (chart, totalCandidates) => {
  const centerX = chart.plotWidth / 1.99;
  const centerY2 = chart.plotHeight / 1.2;
  const centerY = chart.plotHeight / 1.3;
  const customHTML = `<span style="font-size: 22px; font-weight: bold; color: #333333;">${totalCandidates}</span>`;
  const customHTML2 = '<span style="font-size: 12px; font-weight: 300;">Bancas totales</span>';

  // Render custom HTML in the center
  chart.renderer.text(customHTML, centerX, centerY).attr({ align: 'center' }).add();
  chart.renderer.text(customHTML2, centerX, centerY2).attr({ align: 'center' }).add();
};

const getHighchartsOptions = (inputData, totalSeats) => {
  return {
    chart: {
      type: 'item',
      events: {
        render: function () {
          const chart = this;
          renderCustomText(chart, totalSeats);
        },
      },
    },
    title: {
      text: '',
    },
    legend: {
      labelFormat: '{name} <span style="opacity: 0.4">{y}</span>',
      itemStyle: {
        color: '#333333', // Custom color for legend labels
        fontWeight: 'bold', // Custom font weight for legend labels
      },
    },
    credits: false,
    exporting: false,
    plotOptions: {
      item: {
        marker: {
          radius: 9, // Adjust the radius to control the dot size
        },
        size: '200%', // Set the size property to 100%
        innerSize: '25%', // Set the innerSize property to 30% (smaller circles in the center)
      },
    },
    series: [
      {
        name: 'Representatives',
        keys: ['name', 'y', 'color'], // optional label
        data: inputData,
        dataLabels: {
          enabled: false,
          format: '{point.label}',
        },
        // Circular options
        center: ['50%', '88%'],
        size: '180%',
        startAngle: -89,
        endAngle: 89,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            series: [
              {
                dataLabels: {
                  distance: -30,
                },
              },
            ],
          },
        },
      ],
    },
  };
};

const HighchartsComponent = ({ data = [], totalSeats = false }) => {
  const processedData = useMemo(() => {
    return data.map((party) => [party.name, party.seats, party.color]);
  }, [data]);

  const getTotalSeats = () => {
    return processedData.reduce((accumulator, party) => {
      return accumulator + party[1]; // Assuming the seat count is at index 1
    }, 0);
  };

  const totalSeatsAvailable = totalSeats || getTotalSeats();

  useEffect(() => {
    const chart = Highcharts.chart('container', getHighchartsOptions(processedData, totalSeatsAvailable));

    return () => {
      chart.destroy();
    };
  }, [processedData, totalSeatsAvailable]);

  return (
    <figure className="highcharts-figure" style={{ position: 'relative' }}>
      <div id="container"></div>
      <p>Hola</p>
    </figure>
  );
};

export default HighchartsComponent;

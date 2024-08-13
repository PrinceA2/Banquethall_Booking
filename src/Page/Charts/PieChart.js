import React from 'react';
import NVD3Chart from 'react-nvd3';

const datum = [
  { key: 'One', y: 29, color: '#41b4a1' },
  { key: 'Two', y: 30, color: '#3895dc' },
  { key: 'Three', y: 32, color: '#a24fdd' },
  { key: 'Four', y: 96, color: '#e88956' },
  // { key: 'Five', y: 2, color: '#4F5467' },
  // { key: 'Six', y: 98, color: '#1de9b6' },
  // { key: 'Seven', y: 13, color: '#a389d4' },
  // { key: 'Eight', y: 5, color: '#FE8A7D' }
];

const PieChart = () => {
  return <NVD3Chart id="chart" height={300} margin={77} type="pieChart" datum={datum} x="key" y="y" />;
};

export default PieChart;
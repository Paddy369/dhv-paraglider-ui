import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function ExplorerChart({ data }) {
  const [xAxisMetric, setXAxisMetric] = useState('Jahr');
  const [yAxisMetric, setYAxisMetric] = useState('numericWeight');

  const metrics = {
    Jahr: { label: 'Zulassungsjahr', unit: '' },
    numericWeight: { label: 'Gewicht (kg)', unit: ' kg' },
    numericArea: { label: 'Projizierte Fläche (m²)', unit: ' m²' },
    minWeight: { label: 'Startgewicht Min (kg)', unit: ' kg' },
    maxWeight: { label: 'Startgewicht Max (kg)', unit: ' kg' }
  };

  const getOptions = () => {
    const validData = data.filter(d => d[xAxisMetric] > 0 && d[yAxisMetric] > 0);
    const xLabel = metrics[xAxisMetric].label;
    const yLabel = metrics[yAxisMetric].label;

    return {
      tooltip: {
        formatter: (p) => `<div style="padding:5px;color:#000;text-align:left;">
          <strong>${p.data[2]}</strong><br/>${xLabel}: ${p.data[0]}${metrics[xAxisMetric].unit}<br/>
          ${yLabel}: ${p.data[1]}${metrics[yAxisMetric].unit}<br/>Klasse: ${p.data[3]}</div>`
      },
      xAxis: { type: 'value', name: xLabel, nameLocation: 'middle', nameGap: 30, scale: true },
      yAxis: { type: 'value', name: yLabel, nameLocation: 'middle', nameGap: 40, scale: true },
      series: [{
        type: 'scatter', symbolSize: 14, itemStyle: { color: '#aa3bff', opacity: 1 },
        data: validData.map(d => [d[xAxisMetric], d[yAxisMetric], d.Name, d.Klassifizierung])
      }]
    };
  };

  return (
    <div style={{ flex: '1 1 45%', minWidth: '450px', height: '500px', display: 'flex', flexDirection: 'column', background: 'var(--bg)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>Eigene Daten-Analyse</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select value={xAxisMetric} onChange={(e) => setXAxisMetric(e.target.value)} style={{ padding: '4px', fontSize: '12px', background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)' }}>
            {Object.entries(metrics).map(([key, m]) => <option key={`x-${key}`} value={key}>X: {m.label}</option>)}
          </select>
          <select value={yAxisMetric} onChange={(e) => setYAxisMetric(e.target.value)} style={{ padding: '4px', fontSize: '12px', background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)' }}>
            {Object.entries(metrics).map(([key, m]) => <option key={`y-${key}`} value={key}>Y: {m.label}</option>)}
          </select>
        </div>
      </div>
      <ReactECharts option={getOptions()} style={{ flexGrow: 1, width: '100%' }} opts={{ renderer: 'canvas' }} />
    </div>
  );
}
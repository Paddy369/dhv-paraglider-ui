import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function WeightChart({ data, useWeightFilter, pilotWeight }) {
  const chartModeTitle = useWeightFilter
    ? 'Startgewichte (Nach Optimum sortiert)'
    : 'Zugelassene Startgewichte (Top 20)';

  const getOptions = () => {
    let displayData = data.filter(d => d.minWeight > 0 && d.maxWeight < 999);

    displayData = displayData.map(d => {
        const range = d.maxWeight - d.minWeight;
        let pRel = -1;
        let score = -999;
        
        let barColor = '#aa3bff'; 
        let category = '';

        if (useWeightFilter && range > 0) {
            pRel = (pilotWeight - d.minWeight) / range;
            
            let diff = pRel - 0.75;
            score = diff <= 0 ? (100 - Math.abs(diff) * 100) : (100 - Math.abs(diff) * 200);

            if (pRel < 0 || pRel > 1) {
                barColor = '#fa5252';
                category = 'Außerhalb des Bereichs';
            } else if (score >= 95) {
                barColor = '#2b8a3e';
                category = 'Perfekt';
            } else if (score >= 85) {
                barColor = '#82c91e';
                category = 'Sehr Gut';
            } else if (score >= 75) {
                barColor = '#fab005';
                category = 'Durchschnittlich';
            } else if (score >= 60) {
                barColor = '#fd7e14';
                category = 'Unterdurchschnittlich';
            } else {
                barColor = '#fa5252';
                category = 'Suboptimal';
            }
        }
        return { ...d, pRel, score, barColor, category };
    });

    if (useWeightFilter) {
        displayData.sort((a, b) => b.score - a.score);
    } else {
        displayData.sort((a, b) => a.Name.localeCompare(b.Name));
    }

    displayData = displayData.slice(0, 20); 

    return {
      title: {
        text: chartModeTitle,
        textStyle: { fontSize: 14, color: '#4b5563' },
      },
      tooltip: { 
        trigger: 'item',
        formatter: (p) => {
            if (p.seriesName !== 'Range') return ''; 
            
            const d = p.data;
            const pctText = (useWeightFilter && d.pRel >= 0) ? `<br/>Dein Anteil: <strong>${Math.round(d.pRel * 100)}%</strong>` : '';
            const catText = (useWeightFilter && d.pRel >= 0) ? `<br/><span style="color:${d.itemStyle.color}; font-weight:bold;">${d.category} (Score: ${Math.round(d.score)})</span>` : '';
            return `<span style="color:#000"><strong>${p.name}</strong><br/>Range: ${d.fullRange}${pctText}${catText}</span>`;
        } 
      },
      grid: { left: '3%', right: '4%', bottom: '5%', containLabel: true },
      xAxis: { 
        type: 'value', 
        name: 'Startgewicht (kg)', 
        nameLocation: 'middle',
        nameGap: 34,
        nameTextStyle: { color: '#4b5563', padding: [0, 0, 0, -28] },
        min: 40, 
        max: 150,
        splitLine: { lineStyle: { type: 'dashed', color: 'var(--border)' } } 
      },
      yAxis: { 
        type: 'category', 
        data: displayData.map(d => d.Name), 
        inverse: true, 
        axisLabel: { width: 100, overflow: 'truncate', color: 'var(--text)' } 
      },
      series: [
        { 
          name: 'Base', 
          type: 'bar', 
          stack: 'Total', 
          itemStyle: { borderColor: 'transparent', color: 'transparent' },
          emphasis: { disabled: true }, 
          data: displayData.map(d => d.minWeight) 
        },
        { 
          name: 'Range', 
          type: 'bar', 
          stack: 'Total', 
          data: displayData.map(d => ({ 
            value: d.maxWeight - d.minWeight, 
            fullRange: d.Startgewicht,
            pRel: d.pRel,
            category: d.category,
            score: d.score,
            itemStyle: { 
                color: d.barColor, 
                borderRadius: 4 
            },
            emphasis: {
                itemStyle: { color: d.barColor } 
            }
          })) 
        },
        { 
          type: 'line', 
          markLine: { 
            animation: false, 
            data: useWeightFilter ? [{ xAxis: pilotWeight, name: 'Dein Gewicht' }] : [], 
            symbol: 'none',
            label: { 
                formatter: 'Dein Gewicht', 
                position: 'start', 
                padding: [0, 0, 5, 0], 
                color: '#ff4757',
                fontWeight: 'bold',
                fontSize: 13
            },
            lineStyle: { 
                color: '#ff4757', 
                width: 3, 
                type: 'dashed' 
            }
          } 
        }
      ]
    };
  };

  return (
    <div style={{ flex: '1 1 45%', minWidth: '450px', height: '500px', display: 'flex', flexDirection: 'column', background: 'var(--bg)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
      <h2 style={{ margin: '0 0 2px 0', fontSize: '18px', textAlign: 'left' }}>Startgewicht-Optimierer</h2>
      <ReactECharts 
        option={getOptions()} 
        style={{ flexGrow: 1, width: '100%' }} 
        opts={{ renderer: 'canvas' }} 
        notMerge={true} 
      />
    </div>
  );
}
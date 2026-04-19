import React, { useState } from 'react';
import { useGliderData } from './hooks/useGliderData';
import FilterPanel from './components/FilterPanel';
import ExplorerChart from './components/ExplorerChart';
import WeightChart from './components/WeightChart';
import GliderGrid from './components/GliderGrid';
import GliderModal from './components/GliderModal';

function App() {
  const { filteredData, filters, updateFilter, herstellerOptions, klasseOptions } = useGliderData();
  const [selectedGlider, setSelectedGlider] = useState(null);

  return (
    <div style={{ padding: '20px', width: '100%', boxSizing: 'border-box' }}>
      <h1 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>DHV Gerätedatenbank</h1>
      
      <FilterPanel 
        filters={filters} 
        updateFilter={updateFilter} 
        herstellerOptions={herstellerOptions} 
        klasseOptions={klasseOptions} 
      />

      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <ExplorerChart data={filteredData} />
        <WeightChart data={filteredData} useWeightFilter={filters.useWeight} pilotWeight={filters.pilotWeight} />
      </div>

      <GliderGrid data={filteredData} onRowClick={setSelectedGlider} />
      
      <GliderModal glider={selectedGlider} onClose={() => setSelectedGlider(null)} />
    </div>
  );
}

export default App;
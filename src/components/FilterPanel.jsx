import React from 'react';

export default function FilterPanel({ filters, updateFilter, herstellerOptions, klasseOptions }) {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px', padding: '20px', backgroundColor: 'var(--social-bg)', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'left' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Suche (Name):</label>
        <input type="text" placeholder="z.B. Ion, Enzo..." value={filters.search} onChange={(e) => updateFilter('search', e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Ab Jahr: {filters.minYear}</label>
        <input type="range" min="1990" max="2026" value={filters.minYear} onChange={(e) => updateFilter('minYear', parseInt(e.target.value))} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Hersteller:</label>
        <select value={filters.hersteller} onChange={(e) => updateFilter('hersteller', e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
          {herstellerOptions.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Klasse:</label>
        <select value={filters.klasse} onChange={(e) => updateFilter('klasse', e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}>
          {klasseOptions.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid var(--border)', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '5px' }}>
          <input type="checkbox" checked={filters.useWeight} onChange={(e) => updateFilter('useWeight', e.target.checked)} />
          Startgewicht Optimiert
        </label>
        <input 
          type="range" 
          min="50" max="150" 
          value={filters.pilotWeight} 
          onChange={(e) => updateFilter('pilotWeight', parseInt(e.target.value))} 
          disabled={!filters.useWeight} 
          style={{ 
            cursor: filters.useWeight ? 'pointer' : 'not-allowed',
            width: '200px'
          }} 
        />
        <span style={{ fontSize: '12px', marginTop: '4px', color: filters.useWeight ? 'var(--text)' : '#999' }}>
          Pilotengewicht: {filters.pilotWeight} kg
        </span>
      </div>

    </div>
  );
}
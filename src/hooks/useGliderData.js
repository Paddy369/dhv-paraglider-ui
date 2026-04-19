import { useState, useEffect } from 'react';

export function useGliderData() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  // Grouped filter state
  const [filters, setFilters] = useState({
    search: '',
    minYear: 1990,
    hersteller: 'Alle',
    klasse: 'Alle',
    useWeight: false,
    pilotWeight: 85
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Fetch and clean the data
  useEffect(() => {
    fetch('/dhv_gliders.json')
      .then(res => res.json())
      .then(jsonData => {
        const cleaned = jsonData.filter(i => i.Name).map(item => {
          let year = 1990, minW = 0, maxW = 999;
          
          if (item['Musterprüfdatum']) {
            const parts = String(item['Musterprüfdatum']).split('.');
            if (parts.length === 3) year = parseInt(parts[2], 10);
          }

          if (item['Startgewicht']) {
            const match = String(item['Startgewicht']).match(/(\d+)\s*-\s*(\d+)/);
            if (match) {
              minW = parseInt(match[1], 10);
              maxW = parseInt(match[2], 10);
            } else {
              const single = String(item['Startgewicht']).match(/(\d+)/);
              if (single) maxW = parseInt(single[1], 10);
            }
          }

          return {
            ...item,
            numericWeight: parseFloat(String(item['Gewicht (ohne Packsack)']).replace(/[^0-9.]/g, '')) || 0,
            numericArea: parseFloat(String(item['Projizierte Fläche']).replace(/[^0-9.]/g, '')) || 0,
            Jahr: year,
            minWeight: minW,
            maxWeight: maxW
          };
        });
        setData(cleaned);
        setFilteredData(cleaned);
      });
  }, []);

  // Run the filters every time the user changes an input
  useEffect(() => {
    let result = data;
    
    // Hersteller Filter
    if (filters.hersteller !== 'Alle') {
      result = result.filter(d => d.Hersteller === filters.hersteller);
    }
    
    // Klasse Filter (including "Sonstige" logic)
    if (filters.klasse !== 'Alle') {
      if (filters.klasse === 'Sonstige') {
        const standardClasses = ['A', 'B', 'C', 'D'];
        // Keep gliders that do NOT contain any of the standard classes
        result = result.filter(d => {
          const klasseStr = String(d.Klassifizierung);
          return !standardClasses.some(cls => klasseStr.includes(cls));
        });
      } else {
        // Standard matching for A, B, C, D
        result = result.filter(d => String(d.Klassifizierung).includes(filters.klasse));
      }
    }

    // Text Search
    if (filters.search) {
      result = result.filter(d => d.Name.toLowerCase().includes(filters.search.toLowerCase()));
    }
    
    // Year Filter
    result = result.filter(d => d.Jahr >= filters.minYear);
    
    // Pilot Weight Filter
    if (filters.useWeight) {
      result = result.filter(d => filters.pilotWeight >= d.minWeight && filters.pilotWeight <= d.maxWeight);
    }
    
    setFilteredData(result);
  }, [filters, data]);

  // Extract manufacturers, sort them alphabetically, and pin 'Alle' to the top
  const uniqueHersteller = [...new Set(data.map(d => d.Hersteller).filter(Boolean))].sort();
  const herstellerOptions = ['Alle', ...uniqueHersteller];
  
  // Add 'Sonstige' to the end of the standard classes
  const klasseOptions = ['Alle', 'A', 'B', 'C', 'D', 'Sonstige'];

  return { filteredData, filters, updateFilter, herstellerOptions, klasseOptions };
}
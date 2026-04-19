import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const myCustomTheme = themeQuartz.withParams({
    backgroundColor: "var(--bg)", foregroundColor: "var(--text)",
    headerBackgroundColor: "var(--social-bg)", headerTextColor: "var(--text-h)",
    borderColor: "var(--border)", wrapperBorderRadius: "8px", rowBorderColor: "var(--border)",
    rowHeight: 56, headerHeight: 60, fontFamily: "var(--sans)", fontSize: "15px",
    rowHoverColor: "var(--accent-bg)", selectedRowBackgroundColor: "var(--accent-bg)"
});

export default function GliderGrid({ data, onRowClick }) {
  const columnDefs = useMemo(() => [
    { field: 'Name', filter: true, sortable: true, flex: 2 },
    { field: 'Hersteller', filter: true, sortable: true, flex: 1.5 },
    { field: 'Klassifizierung', headerName: 'Klasse', filter: true, sortable: true, width: 100 },
    { field: 'Jahr', filter: 'agNumberColumnFilter', sortable: true, width: 100 },
    { field: 'Gewicht (ohne Packsack)', headerName: 'Gewicht', sortable: true, width: 120 },
    { field: 'Projizierte Fläche', headerName: 'Fläche', sortable: true, width: 120 },
    { field: 'Startgewicht', sortable: true, flex: 1 }
  ], []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
        <h2 style={{ margin: 0 }}>Fluggeräte ({data.length} Treffer)</h2>
        <span style={{ fontSize: '14px', color: 'var(--text)' }}>Klick auf eine Zeile für Details</span>
      </div>
      <div style={{ height: '1200px', width: '100%', display: 'block', borderRadius: '8px', overflow: 'hidden' }}>
        <AgGridReact 
          theme={myCustomTheme} rowData={data} columnDefs={columnDefs} 
          defaultColDef={{ resizable: true }} pagination={true} paginationPageSize={20}
          onRowClicked={(e) => onRowClick(e.data)} 
        />
      </div>
    </div>
  );
}
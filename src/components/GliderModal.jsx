import React from 'react';

export default function GliderModal({ glider, onClose }) {
  if (!glider) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onClose}>
      <div style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', padding: '30px', borderRadius: '12px', maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: 'var(--text-h)' }}>{glider.Name}</h2>
          <button onClick={onClose} style={{ background: 'var(--border)', color: 'var(--text-h)', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <tbody>
            {Object.entries(glider).map(([key, value]) => {
              const hidden = ['numericWeight', 'numericArea', 'Jahr', 'minWeight', 'maxWeight'];
              if (hidden.includes(key) || !value) return null;
              return (
                <tr key={key} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 5px', fontWeight: 'bold', width: '40%' }}>{key}</td>
                  <td style={{ padding: '10px 5px' }}>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
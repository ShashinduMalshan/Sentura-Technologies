import { useState, useEffect } from 'react';

interface Country {
  flag: string;
  name: string;
  capital: string;
  region: string;
  population: number;
}

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/countries?search=${search}`)
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err));
  }, [search]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Countries Directory</h2>
      
      <input 
        type="text" 
        placeholder="Search countries..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', border: '1px solid #ddd' }}>
        {/* ADDED color: '#000' HERE SO THE TEXT IS BLACK ON THE GRAY BACKGROUND */}
        <thead style={{ backgroundColor: '#f4f4f4', color: '#000' }}>
          <tr>
            <th style={{ padding: '10px' }}>Flag</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Capital</th>
            <th style={{ padding: '10px' }}>Region</th>
            <th style={{ padding: '10px' }}>Population</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((c, i) => (
            <tr key={i} onClick={() => setSelectedCountry(c)} style={{ cursor: 'pointer' }}>
              <td style={{ padding: '10px' }}><img src={c.flag} alt="flag" width="50" /></td>
              <td style={{ padding: '10px' }}>{c.name}</td>
              <td style={{ padding: '10px' }}>{c.capital}</td>
              <td style={{ padding: '10px' }}>{c.region}</td>
              <td style={{ padding: '10px' }}>{c.population.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup */}
      {selectedCountry && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', minWidth: '350px', textAlign: 'center', color: '#000' }}>
            <h2>{selectedCountry.name}</h2>
            <img src={selectedCountry.flag} alt="flag" width="120" style={{ marginBottom: '15px', border: '1px solid #ddd' }} />
            <p style={{ textAlign: 'left' }}><strong>Capital:</strong> {selectedCountry.capital}</p>
            <p style={{ textAlign: 'left' }}><strong>Region:</strong> {selectedCountry.region}</p>
            <p style={{ textAlign: 'left' }}><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
            <button 
              onClick={() => setSelectedCountry(null)} 
              style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
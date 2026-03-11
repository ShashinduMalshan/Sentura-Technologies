import React, { useEffect, useState } from "react";
import axios from "axios";

// Country type
type Country = {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
};

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Country | null>(null);

  // Fetch countries
  useEffect(() => {
    axios
      .get<Country[]>("http://localhost:8080/countries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filtered countries based on search
  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Countries</h2>

      <input
        type="text"
        placeholder="Search country"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "5px", marginBottom: "10px", width: "200px" }}
      />

      <table
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "5px" }}>Flag</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Capital</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Region</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Population</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((c) => (
            <tr
              key={c.name}
              onClick={() => setSelected(c)}
              style={{ cursor: "pointer" }}
            >
              <td style={{ border: "1px solid black", padding: "5px" }}>
                <img src={c.flag} width={40} alt={c.name} />
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{c.name}</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{c.capital}</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{c.region}</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {c.population.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            marginTop: "20px",
            width: "300px",
          }}
        >
          <h3>{selected.name}</h3>
          <p>Capital: {selected.capital}</p>
          <p>Region: {selected.region}</p>
          <p>Population: {selected.population.toLocaleString()}</p>
          <img src={selected.flag} width={100} alt={selected.name} />
          <br />
          <button
            style={{ marginTop: "10px", padding: "5px" }}
            onClick={() => setSelected(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
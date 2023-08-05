import "./styles.css";
import React from "react";

export default function App() {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [filters, setFilters] = React.useState([]);

  React.useEffect(() => {
    // Load data from API or other source
    const loadedData = [
      { id: 1, name: 'John', age: 32, gender: 'Male' },
      { id: 2, name: 'Jane', age: 25, gender: 'Female' },
      { id: 3, name: 'Bob', age: 40, gender: 'Male' },
      { id: 4, name: 'Alice', age: 30, gender: 'Female' },
    ];
    setData(loadedData);
    setFilteredData(loadedData);
  }, []);

  const handleFilterChange = React.useCallback(
    (event) => {
      const filter = event.target.name;
      const isChecked = event.target.checked;

      let newFilters;

      if (isChecked) {
        newFilters = [...filters, filter];
      } else {
        newFilters = filters.filter((f) => f !== filter);
      }

      setFilters(newFilters);

      let newFilteredData = data;

      if (newFilters.length > 0) {
        newFilteredData = data.filter((d) => newFilters.includes(d.gender));
      }

      setFilteredData(newFilteredData);
    },
    [data, filters]
  );

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="Male"
          onChange={handleFilterChange}
          checked={filters.includes('Male')}
        />
        Male
      </label>
      <label>
        <input
          type="checkbox"
          name="Female"
          onChange={handleFilterChange}
          checked={filters.includes('Female')}
        />
        Female
      </label>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(({ id, name, age, gender }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

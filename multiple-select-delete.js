import "./styles.css";
import {useState} from 'react'

export default function App() {
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, value: 'item1', isChecked: false },
    { id: 2, value: 'item2', isChecked: false },
    { id: 3, value: 'item3', isChecked: false },
  ]);

  const handleChange = (id) => {
    setCheckboxes(checkboxes.map((checkbox) => (checkbox.id === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox)));
  };

  const handleDelete = () => {
    setCheckboxes(checkboxes.filter((checkbox) => !checkbox.isChecked));
  };
  return (
    <div>
      <ul>
        {checkboxes.map((checkbox) => (
          <li key={checkbox.id}>
            <input type="checkbox" checked={checkbox.isChecked} onChange={() => handleChange(checkbox.id)} />{' '}
            {checkbox.value}
          </li>   ))}   
          </ul>  
           <button onClick={handleDelete}>Delete Selected</button> </div>
  );
}

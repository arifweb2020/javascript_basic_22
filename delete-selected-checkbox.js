import "./styles.css";
import {useState} from 'react'

export default function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', checked: false },
    { id: 2, name: 'Item 2', checked: false },
    { id: 3, name: 'Item 3', checked: false },
  ]);

  const handleChange = (id) => {

    const newItems = items.map((item) => {

      if (item.id === id) {

        return { ...item, checked: !item.checked };

      } else {

        return item;

      }

    });

    setItems(newItems);

  };

  const deleteSelected = () => {

    const newItems = items.filter((item) => !item.checked);

    setItems(newItems);

  };  
  return (
    <div className="App">
     <ul>  
         {items.map((item) => (  
           <ListItem key={item.id} item={item} onChange={() => handleChange(item.id)} />  
         ))}  
       </ul>  
       <button onClick={deleteSelected}>Delete Selected</button> 
    </div>
  );
}


 const ListItem = ({ item, onChange }) => {
  return (
    <div>
      <input type="checkbox" checked={item.checked} onChange={onChange} />
      {item.name}
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import './App.css'
import FormPage from './Form'
import { Routes, Route, Link } from 'react-router-dom';
import TableView from './Table'
//import "bootstrap/dist/css/bootstrap.min.css";

interface IFoodItem {
  id: number;
  name: string;
  fav: string;
}

const App = () => {
  const [foodItems, setFoodItems] = useState<IFoodItem[]>([]);

  const addFoodItem = (itemName: string, fav: string) => {
    const newItem: IFoodItem = { id: foodItems.length + 1, name: itemName, fav}
    setFoodItems([...foodItems, newItem])
  }

  const editFoodItem = (id: number, newName: string, fav: string) => {
    const updatedItems = foodItems.map(item => item.id === id ? { ...item, name: newName, fav } : item);
    setFoodItems(updatedItems);
  }

  const deleteFoodItem = (id: number) => {
    const updatedItems = foodItems.filter(item => item.id !== id);
    setFoodItems(updatedItems)
  }


  return (
    <div>
      <h1 className='mb-5'> Food Tracker App </h1>
      <Link to='/add'>Add Food Item</Link> || <Link to='/table'> View Table</Link>
      <Routes>
        <Route path='/add' element={<FormPage onAdd={addFoodItem} onEdit={editFoodItem}  />} />
        <Route path='/edit/:id' element={<FormPage onAdd={addFoodItem} onEdit={editFoodItem}  />} />
        <Route path='/table' element={<TableView items={foodItems} onDelete={deleteFoodItem} />} />
      </Routes>
    </div>
  );

};


export default App

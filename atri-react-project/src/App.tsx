/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./App.css";
import FormPage from "./Form";
import { Routes, Route, Link } from "react-router-dom";
import TableView from "./Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";

interface IFoodItem {
  id: number;
  name: string;
  fav: string;
  isVegan: string;
}

const App = () => {
  const [foodItems, setFoodItems] = useState<IFoodItem[]>([]);

  const addFoodItem = (itemName: string, fav: string, isVegan: string) => {
    const newItem: IFoodItem = {
      id: foodItems.length + 1,
      name: itemName,
      fav,
      isVegan,
    };
    setFoodItems([...foodItems, newItem]);
  };

  const editFoodItem = (
    id: number,
    newName: string,
    fav: string,
    isVegan: string
  ) => {
    const updatedItems = foodItems.map((item) =>
      item.id === id ? { ...item, name: newName, fav, isVegan } : item
    );
    setFoodItems(updatedItems);
  };

  const deleteFoodItem = (id: number) => {
    const updatedItems = foodItems.filter((item) => item.id !== id);
    setFoodItems(updatedItems);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">Food Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/add">
              Add Food Item
            </Nav.Link>
            <Nav.Link as={Link} to="/table">
              View Table
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/add"
          element={<FormPage onAdd={addFoodItem} onEdit={editFoodItem} />}
        />
        <Route
          path="/edit/:id"
          element={<FormPage onAdd={addFoodItem} onEdit={editFoodItem} />}
        />
        <Route
          path="/table"
          element={<TableView items={foodItems} onDelete={deleteFoodItem} />}
        />
      </Routes>
    </>
  );
};

export default App;

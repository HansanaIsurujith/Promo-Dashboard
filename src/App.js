import React from 'react';
import Add from './Components/Add'
import Update from './Components/Update'
import PromotionList from './Components/Promotion/PromotionList';
import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PromotionList />}/>
          <Route path="/add" element={<Add />}/>
          <Route path="/update/:id" element={<Update />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

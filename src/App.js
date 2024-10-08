import React from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Add from './Components/Add'
import Update from './Components/Update'
import PromotionList from './Components/Promotion/PromotionList';
import ClientPromotions from './Components/ClientPromotions'
import './App.css';


function App() {
  return (
      <div className={"app-container"}>
      <header>
        <button className="theme-toggle-btn">
        </button>
      </header>
        <BrowserRouter>
          <Routes>
            {/* Clent Side Route*/}
            <Route path="/" element={<ClientPromotions/>}/>

            {/*Admin Dashboard*/}
            <Route path="/admin" element={<PromotionList />}/>

            {/*CRUD Routes*/}
            <Route path="/update/:id" element={<Update />}/>
            <Route path="/add" element={<Add />}/>

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

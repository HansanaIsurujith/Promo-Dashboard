import React from 'react';
import Add from './Components/Add'
import Update from './Components/Update'
import PromotionList from './Components/Promotion/PromotionList';
import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ThemeProvider from './Components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PromotionList />}/>
            <Route path="/update/:id" element={<Update />}/>
            <Route path="/add" element={<Add />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

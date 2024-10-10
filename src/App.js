import React, { useEffect, useState } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Add from './Components/Add';
import Update from './Components/Update';
import PromotionList from './Components/Promotion/PromotionList';
import ClientPromotions from './Components/ClientPromotions';
import './App.css';


function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Apply the current theme to the body class
    document.body.className = theme;
    // Store the theme in local storage
    localStorage.setItem('theme', theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
      <div className={`app-container ${theme}`}>
      <header>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
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

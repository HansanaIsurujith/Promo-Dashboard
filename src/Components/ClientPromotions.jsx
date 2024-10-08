import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientPromotions.css';  // Style this according to your needs
import { Link } from 'react-router-dom';

const ClientPromotions = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await axios.get("http://localhost:8800/promotions");
        setPromotions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPromotions();
  }, []);

  return (
    <div className="client-promotions-container">
      <h1>Current Promotions</h1>
      <div className="promotions-list">
        {promotions.map((promotion) => (
          <div className="promotion-card" key={promotion.id}>
            <h2>{promotion.title}</h2>
            <p>{promotion.description}</p>
            <p>Discount: {promotion.discount_percentage}%</p>
          </div>
        ))}
      </div>

      {/* Admin Login button */}
      <div className="login-btn-container">
        <Link to="/admin" className="admin-login-btn">Admin Login</Link>
      </div>
    </div>
  );
};

export default ClientPromotions;

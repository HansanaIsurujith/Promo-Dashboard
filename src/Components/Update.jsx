import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Update.css';

const Update = () => {
    const [promotions,setPromotions] = useState({
        id:"",
        title:"",
        description:"",
        start_date:"",
        end_date:"",
        discount_percentage:"",
    });

    const navigate = useNavigate();
    const location = useLocation();

    const promotionId = location.pathname.split("/")[2];

    const handleChange = (e) =>{
        setPromotions(prev=>({...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async e =>{
        e.preventDefault();
        console.log("Promotions Data:", promotions);
        try{
            await axios.put("http://localhost:8800/promotions/" + promotionId, promotions);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    };

    console.log(promotions);

  return (
    <div className="form-container">
        <h1>Update the Promotions</h1>
        <div className="titles">
            <input className='input-field' type="text" placeholder='Title' onChange={handleChange} name="title"/>
            <input className='input-field' type="text" placeholder='Description' onChange={handleChange} name="description"/>
            <input className='input-field' type="date" placeholder='Start Date' onChange={handleChange} name="start_date"/>
            <input className='input-field' type="date" placeholder='End Date' onChange={handleChange} name="end_date"/>
            <input className='input-field' type="number" placeholder='Discount Percentage' onChange={handleChange} name="discount_percentage"/>
        </div>
        
        <button className="form-button" onClick={handleClick}>Update</button>
    </div>
  )
};

export default Update;
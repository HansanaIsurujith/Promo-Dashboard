import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Add.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
    const [promotions, setPromotions] = useState({
        id: "",
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        discount_percentage: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setPromotions(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!promotions.title || !promotions.description || !promotions.start_date || !promotions.end_date || promotions.discount_percentage === undefined) {
            return alert("All fields are required.");
        }

        if (promotions.discount_percentage < 0 || promotions.discount_percentage > 100) {
            return alert("Discount percentage must be between 0 and 100.");
        }

        // Date validation
        const startDate = new Date(promotions.start_date);
        const endDate = new Date(promotions.end_date);

        if (endDate < startDate) {
            return alert("End date cannot be before start date.");
        }

        try {
            await axios.post("http://localhost:8800/promotions", promotions);
            toast.success("New Promotion Added Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // After 3 seconds, navigate back to the promotion list
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="form-container">
            <h1>Add New Promotion</h1>
            <div className="titles">
                <input className='input-field' type="text" placeholder='Title' onChange={handleChange} name="title" />
                <input className='input-field' type="text" placeholder='Description' onChange={handleChange} name="description" />
                <input className='input-field' type="date" placeholder='Start Date' onChange={handleChange} name="start_date" />
                <input className='input-field' type="date" placeholder='End Date' onChange={handleChange} name="end_date" />
                <input className='input-field' type="number" placeholder='Discount Percentage' onChange={handleChange} name="discount_percentage" />
            </div>

            <button className="form-button" onClick={handleClick}>Add</button>

            <ToastContainer />
        </div>
    );
};

export default Add;

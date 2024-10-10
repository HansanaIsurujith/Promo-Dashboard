import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Papa from 'papaparse'; // Import PapaParse
import '../Promotion/PromotionList.css';

const PromotionList = () => {
  const [promotions, setPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAllPromotions = async () => {
      try {
        const res = await axios.get("http://localhost:8800/promotions");
        console.log("Fetched Promotions:", res.data);
        setPromotions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPromotions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/promotions/" + id);
      setPromotions(promotions.filter(promotion => promotion.id !== id)); // Update the state after deletion
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredPromotions = promotions.filter(promotion =>
    promotion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promotion.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadCSV = () => {
    const csv = Papa.unparse(promotions); // Convert the promotions array to CSV format

    // Create a downloadable CSV file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'promotions_report.csv'); // File name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const user = {
    name: "Hansana",
    profileImage: "https://via.placeholder.com/50",
  };

  return (
    <div className={"dashboard-container"}>
      <aside className="sidebar">
      <div className="logo">
             <h2>PromoDashboard</h2>
           </div>
           <nav className="nav">
             <ul>
               <li><Link to="/admin" className="active">Promotions</Link></li>
             </ul>
           </nav>

           <div className="user-profile">
             <img src={user.profileImage} alt="User Profile" className="profile-img" />
             <div className="user-details">
               <p className="user-name">{user.name}</p>
               <Link to="/profile" className="profile-link">View profile</Link>
            </div>
         </div>
      </aside>

      <div className="main-content">
        <div className="header">
          <h1>Promotion List</h1>
          <input
            type="text"
            placeholder="Search promotions..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="add-new-btn">
            <Link to="/add">Add New</Link>
          </button>
          <button className="download-btn" onClick={handleDownloadCSV}>
            Download CSV
          </button>
        </div>
        <table className="promotion-table">
          <thead>
            <tr>
              <th>Promotion Name</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Discount Percentage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.length > 0 ? (
              filteredPromotions.map((promotion) => (
                <tr key={promotion.id}>
                  <td>{promotion.title}</td>
                  <td>{promotion.description}</td>
                  <td>{promotion.start_date}</td>
                  <td>{promotion.end_date}</td>
                  <td>{promotion.discount_percentage}</td>
                  <td>
                    <button className="edit-btn">
                      <Link to={`/update/${promotion.id}`}>Edit</Link>
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(promotion.id)}>Delete</button>
                    <button className="view-btn">
                      <Link to= "/" className="view-btn">View</Link>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No promotions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromotionList;

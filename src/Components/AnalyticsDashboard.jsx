import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AnalyticsDashboard.css'; // Add styling as needed

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/analytics");
        setAnalyticsData(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics data", err);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="analytics-container">
      <h1>Analytics Dashboard</h1>
      {analyticsData ? (
        <div className="analytics-stats">
          <p>Total Promotions: {analyticsData.totalPromotions}</p>
          <p>Active Promotions: {analyticsData.activePromotions}</p>
          <p>Expired Promotions: {analyticsData.expiredPromotions}</p>

          <h2>User Engagement Over Time</h2>
          <ul>
            {analyticsData.userEngagement.map((entry, index) => (
              <li key={index}>
                {entry.date}: {entry.value} engagements
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading analytics data...</p>
      )}
    </div>
  );
};

export default AnalyticsDashboard;


import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Dashboard = () => {
  const [stats, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
      fetch('http://localhost:3000/dashboard')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-20">
      <div className="row justify-content-center w-100" style={{ maxWidth: '900px' }}>
        {stats.map((stat, index) => (
          <div className="col-10 col-sm-6 col-md-4 mb-4 d-flex justify-content-center" key={index}>
            <div className="card shadow-sm border-primary text-center" style={{ width: '100%', maxWidth: '250px' }}>
              <div className="card-body">
                <div className="display-4">{stat.icon}</div>
                <h5 className="card-title mt-2">{stat.label}</h5>
                <p className="card-text fw-bold fs-3 text-primary">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react'

export const Dashboard = () => {
  const stats = [
    { icon: '👷', label: 'Tareas activas', value: 12 },
    { icon: '📁', label: 'Proyectos abiertos', value: 3 },
    { icon: '✅', label: 'Tareas completadas hoy', value: 4 }
  ];

  return (
    <div className="container mt-5 d-flex justify-content-center">
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

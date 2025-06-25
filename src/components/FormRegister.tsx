import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const taskForm = {
  name: "",
  description: "",
  project: "",
  dev: "",

}

const projectForm = {
  name:""
}


export const FormRegister = () => {
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataDev, setDataDev] = useState([]);
  const navigate = useNavigate();

  const url = (type === "task") ? "http://localhost:3000/task-manager" : "http://localhost:3000/project";

  const callProject = () => {
    fetch("http://localhost:3000/project")
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
  }

  const callUser = () => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        
        setDataDev(data);
        setLoading(false);
        
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  useEffect(() => {
      callProject()
      callUser()
  }, []);
  

  let initialForm = type === 'task' ? taskForm : projectForm;



  const [form, setForm] = useState(initialForm);
  const handleChange = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (type == "task") {
      if (!form.name || !form.description ) {
        alert('Please, send the information in the field');
        return;
      }
    }else{
      if (!form.name) {
        alert('Please, send the information in the field');
        return;
      }
    }



    try {

      const response = await axios.post(url, form);
      if (response.status === 201) {
  
        alert('Formulario enviado con éxito');
        navigate(-1);
      } 

    } catch (error) {
      alert(error);
    }

  }

  const handleReset = (e:any) => {
    setForm(initialForm);
  }


return (
  <div className="mainContainer">
    <div className="w-100" style={{ maxWidth: '800px' }}>
      <div className="p-5 shadow rounded bg-white">
        <h3 className="text-center mb-4">Add {type.charAt(0).toUpperCase() + type.slice(1)}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter name"
              onChange={handleChange}
              value={form.name}
              required
            />
          </div>

          {type === 'task' && (
            <>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Enter description"
                  onChange={handleChange}
                  value={form.description}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="project" className="form-label">Project</label>
                <select
                  className="form-select"
                  name="project"
                  value={form.project}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a project</option>
                  {data.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="dev" className="form-label">Developer</label>
                <select
                  className="form-select"
                  name="dev"
                  value={form.dev}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a developer</option>
                  {dataDev.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              ➕ Add {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}

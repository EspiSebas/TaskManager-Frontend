import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';


const taskForm = {
    name: "",
    description: "",
    project: "",
    dev: "",

}

interface Developer {
  name: string;
}

interface Project {
  name: string;
}

interface Task {
  id: number;
  name: string;
  description: string;
  state?: string; // opcional si puede faltar
  status?: string; // para los proyectos
  dev?: Developer;
  project?: Project;
  comment?: string;
}


interface Dev {
  id: number;
  name: string;
}


export const FormUpdate = () => {
    const { type } = useParams();
    const [data, setData] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataDev, setDataDev] = useState<Task[]>([]);
    const { state } = useLocation();
    const item = state;
    const navigate = useNavigate()

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


    const states = [
      'pending',
      'in_progress',
      'completed'
    ]

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

    const taskForm = {
        name: item.name || "",
        description: item.description || "",
        project: item.project || "",
        dev: item.dev || "",
        state: item.state || ""

    }

    const projectForm = {
        name: item.name || "",
    }

    let initialForm = type === "task" ? taskForm : projectForm;



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
            if (!form.name || !form.description) {
                alert('Please, send the information in the field');
                return;
            }
        }

        
        try {
            const response = await axios.patch(`${url}/${item.id}`, form);
            if (response.status === 200) {
                alert(`${item.name} updated correctly !!`);
                navigate(-1);
            }

        } catch (error) {
            console.log(form);
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
        <h3 className="text-center mb-4">Update {item.name}</h3>

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
          <div className="mb-3">
                <label htmlFor="project" className="form-label">State</label>
                <select
                  className="form-select"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select state</option>
                  {states.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
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
                    <option key={item.id} value={item.id}>
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
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="d-grid">
            <button className="btn btn-success" type="submit">
              💾 Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}

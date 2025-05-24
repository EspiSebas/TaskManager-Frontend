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
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async (e) => {
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

  const handleReset = (e) => {
    setForm(initialForm);
  }


  return (
    <div className="mainContainer" >
      <div className="styleFormRegisterAndLogin">
        <h3>Add {type}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label><br></br>
            <input type='text' name='name' placeholder='name' onChange={handleChange} value={form.name} />
          </div>
          {

            (type == 'task') ? (
              <>
                <div className="mb-3">
                  <label htmlFor="Description" className="form-label">Description:</label><br></br>
                  <input type='text' name='description' placeholder='description' onChange={handleChange} value={form.description} />
                </div>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Project:</label><br></br>
                  <select className="form-select" value={form.project} onChange={handleChange} name='project'>
                    {data.map((item) => {
                      return (
                        <option key={item.id} value={item.name}>{item.name}</option>
                      )
                    })
                    }
                  </select>

                </div>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Developer:</label><br></br>
                  <select className="form-select" value={form.dev} onChange={handleChange} name='dev'>
                    {dataDev.map((item) => {
                      return (
                        <option key={item.id} value={item.name}>{item.name}</option>
                      )
                    })
                    }
                  </select>

                </div>
              </>
            ) : (
              <>
                

              </>
            )
          }
          
          
          <div>
            <button className='btn btn-primary' type="submit"> Add</button> <br></br><br></br>

          </div>
        </form>

      </div>
    </div>
  )
}

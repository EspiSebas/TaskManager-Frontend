import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export const Table = ({ url, title }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const callApi = () => {
        fetch(url)
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


    useEffect(() => {
        callApi()
    }, []);

    const deleteTaskOrProject = async (id: any) => {
        try {
          await axios.delete(`${url}/${id}`);
          alert('Task deleted correctly !!');
          callApi()
        } catch (error) {
          alert(error);
        }
    };

    const navigate = useNavigate()
    const addRegister = (type:any) => {
        
        navigate(`/formRegister/${type}`);
    }



    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <>
            {
                (title === 'Tasks') ? (<h1>Tasks</h1>) : (<h1>Projects</h1>)

            }

            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Number ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            {
                                (title === 'Tasks') ? (
                                    <>
                                        <th scope="col">Project</th>
                                        <th scope="col">Developer</th>
                                        <th scope='col'> Actions</th>

                                    </>
                                ) : (
                                    <th scope='col'> Actions</th>
                                )

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <th scope={item.id}>{item.id}</th>
                                        <td>{item.name}</td>
                                        {
                                            (title === "Tasks") ? (
                                                <>
                                                    <td>{item.state}</td>
                                                    <td>{item.project.name}</td>
                                                    <td>{item.dev.name}</td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{item.status}</td>

                                                </>
                                            )
                                        }

                                        <td>
                                            <button className='btn btn-danger' onClick={() => deleteTaskOrProject(item.id)}>Delete</button>
                                            <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target={`#item_${item.id}`}>See</button>
                                        </td>


                                    </tr>
                                )
                            })

                        }

                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={()=>addRegister(title === "Tasks" ? "task" : "project")}>{title === "Tasks" ? "Add task" : "Add project"}</button>
            </div>
            <div>
                {
                    data.map((item) => {
                        return (
                            <div className="modal fade" id={`item_${item.id}`} tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalCenterTitle">{item.name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <h1>{item.name}</h1>
                                            {
                                                (title === "Tasks") ? (
                                                    <>
                                                    <p>Description <br />{item.description} <br /> Status:<br />  {item.state} <br /> Developer:<br />  {item.dev.name}</p>
                                                    <form action="" method="get">
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment:</label>
                                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                        </div>
                                                        <button type="button" className="btn btn-primary">Save changes</button>
                                                    </form>
                                                    </>
                                                ):(
                                                    <p> <br /> Status:<br />  {item.status} <br /> </p>
                                                )
                                            }
                                            
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                }
            </div>

        </>

    )
}

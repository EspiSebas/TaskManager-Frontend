import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


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

export const Table = ({ url, title, info }: {
    url: string;
    title: 'Tasks' | 'Projects';
    info: { role: string };
}) => {

    const [data, setData] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTaskId, setActiveTaskId] = useState<number | null>(null);


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

    const deleteTaskOrProject = async (id: string | number) => {
        try {
            const response = await axios.delete(`${url}/${id}`);
            alert('Deleted correctly!');
            callApi();
        } catch (error: any) {
            console.error('Delete error:', error);
            alert(`Error deleting item: ${error?.response?.data?.message || error.message}`);
        }
    };

    const navigate = useNavigate()
    const addRegister = (type: any) => {

        navigate(`/formRegister/${type}`);
    }

    const updateOption = (type: any, item: any) => {
        navigate(`/formUpdate/${type}`, { state: item });

    }


    const states = [
        'pending',
        'in_progress',
        'completed'
    ]

    const [forms, setForms] = useState<{ [taskId: number]: { comment: string; state: string } }>({});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, taskId: number) => {
  const { name, value } = e.target;

  setForms(prev => ({
    ...prev,
    [taskId]: {
      ...prev[taskId],
      [name]: value
    }
  }));
};

    const handleSubmit = async (e: any, taskId: number) => {
  e.preventDefault();

  const form = forms[taskId];
  if (!form) return;

  try {
    const response = await axios.patch(`http://localhost:3000/task-manager/comment/${taskId}`, form);
    if (response.status === 200) {
      alert('Comment saved correctly');
      callApi();
    }
  } catch (error: any) {
    alert(error?.response?.data?.message || "Error posting comment");
  }
};



    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <>
    
            <div className='mainContainer'>
                {
                    (title === 'Tasks') ? (<h1 className='text-center me-2 mb-2'>Tasks</h1>) : (<h1 className='text-center'   >Projects</h1>)

                }
                <table className="table table-hover table-bordered">
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
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        {
                                            (title === "Tasks") ? (
                                                <>
                                                    <td>{item.state}</td>
                                                    <td>{item.project?.name}</td>
                                                    <td>{item.dev?.name}</td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{item.state}</td>

                                                </>
                                            )
                                        }

                                        <td>
                                            {
                                                info.role === "admin" ?
                                                    (
                                                        <>
                                                            <button className='btn btn-danger me-2 mb-2' onClick={() => deleteTaskOrProject(item.id)}>Delete</button>
                                                            <button key={item.id} className='btn btn-primary me-2 mb-2' onClick={() => updateOption(title === "Tasks" ? "task" : "project", item)}>Edite</button>
                                                        </>) : ("")
                                            }

                                            <button className='btn btn-warning me-2 mb-2' data-bs-toggle="modal" data-bs-target={`#item_${item.id}`} onClick={() => setActiveTaskId(item.id)}>See</button>

                                        </td>


                                    </tr>
                                )
                            })

                        }

                    </tbody>
                </table>
                {
                    info.role === "admin" ?
                        (
                            <>
                                <div>
                                    <button className="btn btn-primary" onClick={() => addRegister(title === "Tasks" ? "task" : "project")}>{title === "Tasks" ? "Add task" : "Add project"}</button>
                                </div>
                            </>
                        ) : (
                            ""
                        )

                }

            </div>
            <div>
                {
                    data.map((item) => {
                        return (
                            <div className="modal fade" id={`item_${item.id}`} tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalCenterTitle">{item.name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <h4 className="text-center fw-bold mb-4">{item.name}</h4>

                                            {title === "Tasks" ? (
                                                <>
                                                    <ul className="list-group mb-4">
                                                        <li className="list-group-item">
                                                            <strong>Description:</strong> <br /> {item.description}
                                                        </li>
                                                        <li className="list-group-item">
                                                            <strong>Developer:</strong> {item.dev?.name}
                                                        </li>


                                                    </ul>
                                                    {
                                                        item?.comment ? (
                                                            <ul className="list-group mb-4">
                                                                <li className="list-group-item">
                                                                    <strong>Comment:</strong> {item.comment}
                                                                </li>
                                                            </ul>
                                                        ) : (

                                                            <p>There is not comment !!!</p>
                                                        )

                                                    }

                                                    
                                                    <form onSubmit={(e) => handleSubmit(e, item.id)}>

                                                        <div className="mb-3">
                                                            <label htmlFor="project" className="form-label">State</label>
                                                            <select
                                                                className="form-select"
                                                                name="state"
                                                                onChange={(e) => handleChange(e, item.id)}
                                                                value={forms[item.id]?.state || ''}
                                                                required
                                                            >
                                                                <option value="">{item.state}</option>
                                                                {states.map((item) => (
                                                                    <option key={item} value={item}>
                                                                        {item}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="mb-3">
                                                            <label htmlFor="commentBox" className="form-label fw-semibold">Add a Comment</label>
                                                            <textarea
                                                                className="form-control"
                                                                name="comment"
                                                                id="commentBox"
                                                                rows={5}
                                                                placeholder="Write your comment here..."
                                                                onChange={(e) => handleChange(e, item.id)}
                                                                value={forms[item.id]?.comment || ''}
                                                            ></textarea>
                                                        </div>
                                                        <div className="d-grid">
                                                            <button type="submit" className="btn btn-primary">
                                                                💬 Save Comment
                                                            </button>
                                                        </div>
                                                    </form>
                                                </>
                                            ) : (
                                                <ul className="list-group">
                                                    <li className="list-group-item">
                                                        <strong>Status:</strong> {item.state}
                                                    </li>
                                                </ul>
                                            )}
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

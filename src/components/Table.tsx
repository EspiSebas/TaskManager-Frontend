import React, { useEffect, useState } from 'react'

export const Table = ({ url }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);




    useEffect(() => {
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
    }, []);



    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Number ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Project</th>
                        <th scope="col">Developer</th>
                        <th scope='col'> Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <th scope={item.id}>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.state}</td>
                                    <td>{item.project.name}</td>
                                    <td>{item.dev.name}</td>
                                    <td>
                                        <button className='btn btn-danger'>Delete</button>
                                        <button className='btn btn-warning'>See</button>
                                    </td>


                                </tr>
                            )
                        })

                    }

                </tbody>
            </table>
        </div>
    )
}

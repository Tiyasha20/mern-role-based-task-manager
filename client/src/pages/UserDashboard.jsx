import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./UserDashboard.css";

function UserDashboard() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        const fetchTasks = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get("/tasks/mytasks", {

                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                });

                setTasks(response.data);

            } catch (err) {

                console.log(err);

            }

        };

        fetchTasks();

    }, []);
    const handleStatusChange = async (id, status) => {

    try {

        const token = localStorage.getItem("token");

        await api.patch(
            `/tasks/${id}/status`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setTasks(
            tasks.map((task) =>
                task._id === id
                    ? { ...task, status: status }
                    : task
            )
        );

    } catch (err) {

        console.log(err);

    }

};

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");

    };

    return (

        <div className="user-container">

            <div className="user-header">

                <h2>My Tasks</h2>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Due Date</th>

                    </tr>

                </thead>

                <tbody>

                    {tasks.map((task) => (

                        <tr key={task._id}>

                            <td>{task.title}</td>

                            <td>{task.description}</td>

                            <td>{task.priority}</td>

                            <td> <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                         >
                         <option value="Pending">Pending</option>
                         <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                         </select>
                         </td>

                            <td>
                                {new Date(task.dueDate).toLocaleDateString()}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default UserDashboard;
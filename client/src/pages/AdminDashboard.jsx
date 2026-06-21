import "./AdminDashboard.css";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import {useState,useEffect} from "react";
function AdminDashboard(){
    const navigate=useNavigate();
   
    const [tasks, setTasks] = useState([]);
    useEffect(() => {

    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/tasks", {
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

    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    }
    const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Delete this task?");

    if (!confirmDelete)
        return;

    try {

        const token = localStorage.getItem("token");

        await api.delete(`/tasks/${id}`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        setTasks(tasks.filter(task => task._id !== id));

        alert("Task Deleted");

    }
    catch (err) {

        console.log(err);

    }

};

    return(
         <div className="admin-container">
            <h1>Task Management System</h1>
             <h2>Admin Dashboard</h2>
              <p className="welcome">Welcome, Admin</p>
              <div className="card-container">

        <div className="card">
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{tasks.filter(task=>task.status==="Pending").length}</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p>{tasks.filter(task => task.status === "Completed").length}</p>
        </div>

        <div className="card">
          <h3>Users</h3>
          <p>{new Set(tasks.map(task => task.assignedTo?._id)).size}</p>
        </div>

      </div>
      <button className="create-btn" onClick={()=>navigate("/create-task")}>
        + Create Task
      </button>
       <div className="table-container">
       
        <table>

          <thead>

            <tr>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>
           {tasks.map((task)=>(

           
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.assignedTo.name}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <button className="edit-btn"
                onClick={()=>navigate(`/edit-task/${task._id}`)}>Edit</button>
                <button className="delete-btn"
                onClick={()=>handleDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}

           

          </tbody>

        </table>
        

      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
         </div>
        
    );
}
export default AdminDashboard;
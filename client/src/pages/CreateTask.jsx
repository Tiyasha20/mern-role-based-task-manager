import {useState,useEffect} from "react";
import {useNavigate,useParams} from "react-router-dom";
import "./createTask.css";
import api from "../services/api";




function CreateTasks(){

     const navigate = useNavigate();
      const { id } = useParams();
      const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        dueDate: ""
    });
    const [users, setUsers] = useState([]);
    useEffect(() => {

    const fetchUsers = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/users", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setUsers(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    fetchUsers();

}, []);
useEffect(() => {

    if (!id) return;

    const fetchTask = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const task = response.data.find((t) => t._id === id);

            if (task) {

                setFormData({
                    title: task.title,
                    description: task.description,
                    assignedTo: task.assignedTo._id,
                    priority: task.priority,
                    dueDate: task.dueDate.substring(0, 10)
                });

            }

        } catch (err) {

            console.log(err);

        }

    };

    fetchTask();

}, [id]);
     const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };
     const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");
if (id) {

    await api.put(
        `/tasks/${id}`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    alert("Task Updated Successfully");

} else {

    await api.post(
        "/tasks",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    alert("Task Created Successfully");

}

navigate("/admin");

        }
        catch (error) {

            alert(error.response?.data?.message || "Unable to create task");

        }

    };
    return(
        <div className="task-container">
         <div className="task-card">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                 <div className="input-group">

                        <label>Task Title</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter task title"
                            required
                        />
                        </div>
                        <div className="input-group">

                        <label>Description</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            rows="4"
                            required
                        />

                    </div>
                    <div className="input-group">

                        <label>Assign To</label>

                        <select
                            type="text"
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                             required>
                             <option value="">Select User</option>
                             {users.map((user)=>(
                                <option
                                key={user._id}
                                value={user._id}
                                >
                               {user.name}
                                </option>
                             ))}
                           </select>
                        

                    </div>

                       <div className="input-group">

                        <label>Priority</label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>

                    </div>
                     <div className="input-group">

                        <label>Due Date</label>

                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />

                    </div>
                     <div className="button-group">

                        <button
                            type="submit"
                            className="create-btn"
                        >
                            Create Task
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/admin")}
                        >
                            Cancel
                        </button>

                    </div>


            </form>
         </div>
        </div>
    );
}
export default CreateTasks;
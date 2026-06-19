import {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import "./Register.css";
import api from "../services/api"

function Register() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role:"user"
    });
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };
     const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/auth/register", {
                 name: formData.name,
                 email: formData.email,
                 password: formData.password,
                role: formData.role
            });

            alert("Registration Successful");

            navigate("/");

        }
        catch (error) {

            alert(error.response?.data?.message || "Registration Failed");

        }

    };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1>Task Manager</h1>

        <p>Create a new account</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"   //
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
                 onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="input-group">
            <label>Role</label>

            <select
             name="role"
            value={formData.role}
            onChange={handleChange}
            >
              
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

          </div>

          <button className="register-btn">
            Register
          </button>

        </form>

        <p className="login-text">
          Already have an account?
          <Link to="/"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
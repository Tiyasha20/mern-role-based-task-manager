import {Link,useNavigate} from "react-router-dom";
import "./Login.css";
import {useState} from "react";
import api from "../services/api";

function Login(){
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

            const response = await api.post("/auth/login", formData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            if (response.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }

        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };



    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Task Manager</h1>
                <p>Sign in to continue</p>
                <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                    type="email"
                   name="email"
                   onChange={handleChange}

                    value={formData.email}
                     placeholder="Enter your Email"

                    />
                    
                </div>
                 <div className="input-group">
                <label>Password</label>
                 <input
                 type="password"
                 name="password"
                 onChange={handleChange}
                value={formData.password}
                 placeholder="Enter your password"
                 
                />
              </div>
              <button className="login-btn">
              Login
             </button>
                </form>
                <p className="register-text">
                    Dont't Have and account?
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}
export default Login;
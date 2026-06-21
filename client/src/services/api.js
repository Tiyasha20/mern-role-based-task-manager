import axios from "axios";

const api = axios.create({
    baseURL: "https://mern-role-based-task-manager.onrender.com/api"
});

export default api;
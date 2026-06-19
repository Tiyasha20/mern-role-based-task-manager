import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreateTask from "./pages/CreateTask";
import MyTasks from "./pages/MyTasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/create-task" element={<CreateTask />} />
      <Route path="/mytasks" element={<MyTasks />} />
      <Route path="/edit-task/:id" element={<CreateTask />} />
    </Routes>
  );
}

export default App;

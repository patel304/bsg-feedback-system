import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    department: "Scouts"
  });

  const departments = [
    "Cubs","Bulbuls","Scouts","Guides",
    "Rovers","Rangers","Training",
    "Programme","IT Cell","Events"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "candidate");

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <select
          name="department"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          {departments.map((dept, index) => (
            <option key={index}>{dept}</option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success("Login Successful");
      login(data.user);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9'}}>
      <div className="card" style={{width: '100%', maxWidth: '420px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
        <h1 style={{fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px'}}>
          Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '16px'}}>
            <label style={{display: 'block', marginBottom: '8px'}}>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{width: '100%'}}
              placeholder="Enter email"
            />
          </div>

          <div style={{marginBottom: '16px'}}>
            <label style={{display: 'block', marginBottom: '8px'}}>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{width: '100%'}}
              placeholder="Enter password"
            />
          </div>

          <button
            disabled={loading}
            className="btn"
            style={{width: '100%'}}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{textAlign: 'center', marginTop: '16px'}}>
          Don't have an account?

          <Link
            to="/register"
            style={{color: 'var(--accent)', marginLeft: '8px', textDecoration: 'none'}}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
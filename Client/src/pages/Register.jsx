import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/auth/register`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Account created successfully");
      login(data.user);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9'}}>
      <div className="card" style={{width: '100%', maxWidth: '420px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
        <h1 style={{fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px'}}>
          Register
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

          <div style={{marginBottom: '16px'}}>
            <label style={{display: 'block', marginBottom: '8px'}}>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{width: '100%'}}
              placeholder="Confirm password"
            />
          </div>

          <button
            disabled={loading}
            className="btn"
            style={{width: '100%'}}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={{textAlign: 'center', marginTop: '16px'}}>
          Already have an account?

          <Link
            to="/"
            style={{color: 'var(--accent)', marginLeft: '8px', textDecoration: 'none'}}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
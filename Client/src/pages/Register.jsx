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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 45%, #1e293b 100%)",
      }}
    >
      {/* Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Blue Glow */}
      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "#2563eb",
          filter: "blur(140px)",
          opacity: 0.25,
          top: "-120px",
          left: "-120px",
        }}
      />

      {/* Purple Glow */}
      <div
        style={{
          position: "absolute",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: "#7c3aed",
          filter: "blur(140px)",
          opacity: 0.22,
          bottom: "-120px",
          right: "-120px",
        }}
      />

      {/* Cyan Glow */}
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "#06b6d4",
          filter: "blur(120px)",
          opacity: 0.18,
          top: "45%",
          left: "15%",
        }}
      />

      {/* Floating Dots */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "22%",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#8b5cf6",
          boxShadow: "0 0 15px #8b5cf6",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "18%",
          right: "20%",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#3b82f6",
          boxShadow: "0 0 18px #3b82f6",
        }}
      />

      {/* Register Card */}
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Register
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
              style={{ width: "100%" }}
            />
          </div>

          <button
            disabled={loading}
            className="btn"
            style={{ width: "100%" }}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
          }}
        >
          Already have an account?
          <Link
            to="/"
            style={{
              color: "var(--accent)",
              marginLeft: "8px",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
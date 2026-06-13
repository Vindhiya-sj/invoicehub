import "./Login.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function Login() {

  const navigate = useNavigate();
useEffect(() => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }
}, []);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

 const handleLogin = async (e) => {

  e.preventDefault();

  if (
    email === "" ||
    password === ""
  ) {

    toast.error(
      "Please fill all fields"
    );

    return;

  }

  try {

    const response = await axios.post("http://localhost:5000/login",

      {
        email,
        password
      }

    );
    console.log(response.data);

    toast.success(
      response.data.message
    );

    // SAVE TOKEN

    localStorage.setItem(
      "token",
      response.data.token
    );

    // SAVE USER NAME

    localStorage.setItem(
      "userName",
      response.data.user.name
    );
localStorage.setItem(
  "role",
  response.data.role
);

if (response.data.role === "admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
} 
  }
  catch (error) {

    toast.error(

      error.response?.data?.message ||

      "Login Failed"

    );

  }

};

  return (

    <div className="login-page">

      {/* LEFT SIDE */}

      <div className="login-left">

        <div className="overlay"></div>

        <div className="left-content">

          <h1>
            InvoiceHub
          </h1>

          <h2>
            Smart Invoicing.
            <br />
            Better Business.
          </h2>

          <p>
            Create, manage and track invoices
            effortlessly in one place.
          </p>

          <div className="dashboard-preview">

            <div className="preview-card">

              <h3>
                ₹45,000
              </h3>

              <p>
                Revenue Generated
              </p>

            </div>

            <div className="preview-card small">

              <h4>
                120+
              </h4>

              <p>
                Clients
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="login-right">

        <div className="login-box">

          <h2>
            Welcome Back
          </h2>

          <p className="subtitle">
            Login to your InvoiceHub account
          </p>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            {/* PASSWORD */}

            <div className="input-group password-group">

              <label>
                Password
              </label>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <span
                className="eye-icons"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                {
                  showPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                }

              </span>

            </div>

            {/* OPTIONS */}

            <div className="login-options">

              <div className="remember-me">

                <input
                  type="checkbox"
                  id="remember"
                />

                <label htmlFor="remember">
                  Remember me
                </label>

              </div>

              <Link
                to="/forgot-password"
                className="forgot-link"
              >
                Forgot Password?
              </Link>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="login-btn"
            >
              Login to Account
            </button>

          </form>

          <p className="register-text">

            Don’t have an account?

            <Link to="/register">
              Register now
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;
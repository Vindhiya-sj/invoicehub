import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleRegister = async (e) => {

    e.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {

      toast.error("Please fill all fields");
      return;

    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      toast.error("Passwords do not match");
      return;

    }

    try {

      const response = await axios.post(

        "http://localhost:5000/register",

        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }

      );

      toast.success(
        response.data.message
      );

      localStorage.setItem(
        "userName",
        formData.name
      );
localStorage.removeItem("companyDetails");
      navigate("/company-details");

    }
    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Registration Failed"

      );

    }

  };

  return (

    <div className="register-page">

      {/* LEFT SIDE */}

      <div className="register-left">

        <div className="overlay"></div>

        <div className="left-content">

          <h1>
            InvoiceHub
          </h1>

          <h2>
            Manage Your
            <br />
            Business Smartly
          </h2>

          <p>
            Create invoices, manage clients,
            track payments and grow your
            business easily.
          </p>

          <div className="dashboard-preview">

            <div className="preview-card">

              <h3>
                ₹85,000
              </h3>

              <p>
                Monthly Revenue
              </p>

            </div>

            <div className="preview-card small">

              <h3>
                250+
              </h3>

              <p>
                Clients
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="register-right">

        <div className="register-box">

          <h2>
            Create Account
          </h2>

          <p className="subtitle">
            Register your InvoiceHub account
          </p>

          <form onSubmit={handleRegister}>

            {/* NAME */}

            <div className="input-group">

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            {/* EMAIL */}

            <div className="input-group">

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            {/* PASSWORD */}

            <div className="input-group password-group">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />

              <span
                className="eye-icon"
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

            {/* CONFIRM PASSWORD */}

            <div className="input-group password-group">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >

                {
                  showConfirmPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                }

              </span>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="register-btn"
            >
              Save & Continue
            </button>

          </form>

          <p className="login-text">

            Already have an account?

            <Link to="/">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;
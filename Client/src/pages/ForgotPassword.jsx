import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    if (email === "") {
      setError("Email is Required");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Reset link sent successfully");
  };
  axios.post(
    "http://localhost:5000/forgot-password",
    { email }
  );
  return (
    <div className="forgot-container">

      {/* Left Section */}
      <div className="forgot-left">

        <h1 className="logo">InvoiceHub</h1>

        <h2>Reset Your Password</h2>

        <p>
          Enter your registered email address
          to receive password reset instructions.
        </p>

      </div>

      {/* Right Section */}
      <div className="forgot-right">

        <div className="forgot-box">

          <h2>Forgot Password</h2>

          <p className="subtitle">
            We’ll help you recover your account
          </p>

          <form onSubmit={handleReset}>

            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {
              error && (
                <p className="error-message">
                  {error}
                </p>
              )
            }

            {
              success && (
                <p className="success-message">
                  {success}
                </p>
              )
            }

            <button type="submit">
              Send Reset Link
            </button>

            <p className="back-text">
              Back to
              <Link to="/"> Login</Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;
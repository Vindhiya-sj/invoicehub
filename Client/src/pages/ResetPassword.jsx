import "./ResetPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResetPassword() {

    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleResetPassword = (e) => {

        e.preventDefault();

        if (!password || !confirmPassword) {

            setError("Please fill all fields");
            setSuccess("");
            return;

        }

        if (password !== confirmPassword) {

            setError("Passwords do not match");
            setSuccess("");
            return;

        }

        setError("");
        setSuccess("Password Reset Successfully");

        setTimeout(() => {

            navigate("/");

        }, 2000);

    };
    axios.post(
        `http://localhost:5000/reset-password/${token}`,
        { password }
    );
    return (

        <div className="reset-container">

            <div className="reset-left">

                <h1 className="logo">
                    InvoiceHub
                </h1>

                <h2>
                    Create New Password
                </h2>

                <p>
                    Enter your new password and confirm it
                    to regain access to your account.
                </p>

            </div>

            <div className="reset-right">

                <div className="reset-box">

                    <h2>Reset Password</h2>

                    <p className="subtitle">
                        Enter your new password below
                    </p>

                    <form onSubmit={handleResetPassword}>

                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
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
                            Update Password
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default ResetPassword;
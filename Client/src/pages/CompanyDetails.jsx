import "./CompanyDetails.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function CompanyDetails() {

  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(
      companyName === "" ||
      ownerName === "" ||
      jobPosition === "" ||
      companyEmail === "" ||
      companyPhone === "" ||
      companyAddress === ""
    ){

      toast.error("Please fill all fields");
      return;

    }

    try {

      const response = await axios.post(

        "http://localhost:5000/company-details",

        {
          companyName,
          ownerName,
          jobPosition,
          companyEmail,
          companyPhone,
          companyAddress
        }

      );

      toast.success(
        response.data.message
      );

      // SAVE IN LOCAL STORAGE

      const companyDetails = {
        companyName,
        ownerName,
        jobPosition,
        companyEmail,
        companyPhone,
        companyAddress
      };

      localStorage.setItem(
        "companyDetails",
        JSON.stringify(companyDetails)
      );

      navigate("/dashboard");

    }
    catch(error){

      toast.error(
        error.response?.data?.message ||
        "Failed to Save"
      );

    }

  };

  return (

    <div className="company-page">

      {/* LEFT */}

      <div className="company-left">

        <div className="overlay"></div>

        <div className="left-content">

          <h1>
            InvoiceHub
          </h1>

          <h2>
            Set Up Your
            <br />
            Business Profile
          </h2>

          <p>
            Add your company information
            to personalize invoices,
            quotations and payments.
          </p>

          <div className="preview-box">

            <div className="preview-card">

              <h3>
                Professional
              </h3>

              <p>
                Business Management System
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="company-right">

        <div className="company-box">

          <h2>
            Company Details
          </h2>

          <p className="subtitle">
            Complete your business profile
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">

              <label>
                Company Name
              </label>

              <input
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) =>
                  setCompanyName(e.target.value)
                }
              />

            </div>

            <div className="input-group">

              <label>
                Owner Name
              </label>

              <input
                type="text"
                placeholder="Enter owner name"
                value={ownerName}
                onChange={(e) =>
                  setOwnerName(e.target.value)
                }
              />

            </div>

            <div className="input-group">

              <label>
                Job Position
              </label>

              <input
                type="text"
                placeholder="Enter job position"
                value={jobPosition}
                onChange={(e) =>
                  setJobPosition(e.target.value)
                }
              />

            </div>

            <div className="input-group">

              <label>
                Company Email
              </label>

              <input
                type="email"
                placeholder="Enter company email"
                value={companyEmail}
                onChange={(e) =>
                  setCompanyEmail(e.target.value)
                }
              />

            </div>

            <div className="input-group">

              <label>
                Phone Number
              </label>

              <input
                type="text"
                placeholder="Enter phone number"
                value={companyPhone}
                onChange={(e) =>
                  setCompanyPhone(e.target.value)
                }
              />

            </div>

            <div className="input-group">

              <label>
                Company Address
              </label>

              <textarea
                placeholder="Enter company address"
                value={companyAddress}
                onChange={(e) =>
                  setCompanyAddress(e.target.value)
                }
              />

            </div>

            <button
              type="submit"
              className="save-btn"
            >
              Save & Continue
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default CompanyDetails;
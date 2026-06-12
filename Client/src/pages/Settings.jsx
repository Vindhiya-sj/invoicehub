import "./Settings.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
function Settings() {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [user, setUser] = useState("");

  const [showEdit, setShowEdit] = useState(false);

  const [profileData, setProfileData] = useState({
    userName: "",
    email: "",
    password: "",
    companyName: "",
    ownerName: "",
    jobPosition: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: ""
  });

  useEffect(() => {

    const savedUser =
      localStorage.getItem("userName");

    if (savedUser) {
      setUser(savedUser);
    }

  const savedDarkMode =
    localStorage.getItem("darkMode") === "true";

  if (savedDarkMode) {
    document.body.classList.add("dark");
  }



    const companyDetails =
      JSON.parse(localStorage.getItem("companyDetails")) || {};

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const currentUser =
      users.find((u) => u.name === savedUser);

    if (currentUser) {

      setProfileData({
        userName: currentUser.name || "",
        email: currentUser.email || "",
        password: currentUser.password || "",
        companyName: companyDetails.companyName || "",
        ownerName: companyDetails.ownerName || "",
        jobPosition: companyDetails.jobPosition || "",
        companyEmail: companyDetails.companyEmail || "",
        companyPhone: companyDetails.companyPhone || "",
        companyAddress: companyDetails.companyAddress || ""
      });

    }

  }, []);

 const handleDarkMode = () => {

  const newMode = !darkMode;

  setDarkMode(newMode);

  localStorage.setItem(
    "darkMode",
    newMode
  );

  if (newMode) {

    document.body.classList.add("dark");

  } else {

    document.body.classList.remove("dark");

  }

};
  const handleLogout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("userName");

  

  window.location.href = "/";

};

  const handleChange = (e) => {

    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });

  };

  const handleSaveProfile = () => {

    // UPDATE USERS

    let users =
      JSON.parse(localStorage.getItem("users")) || [];

    users = users.map((u) => {

      if (u.name === user) {

        return {
          ...u,
          name: profileData.userName,
          email: profileData.email,
          password: profileData.password
        };

      }

      return u;

    });

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    // UPDATE COMPANY DETAILS

    const updatedCompany = {
      companyName: profileData.companyName,
      ownerName: profileData.ownerName,
      jobPosition: profileData.jobPosition,
      companyEmail: profileData.companyEmail,
      companyPhone: profileData.companyPhone,
      companyAddress: profileData.companyAddress
    };

    localStorage.setItem(
      "companyDetails",
      JSON.stringify(updatedCompany)
    );

    localStorage.setItem(
      "userName",
      profileData.userName
    );

    setUser(profileData.userName);

    alert("Profile Updated Successfully");

    setShowEdit(false);

  };

  return (
<Layout>
    <div className={darkMode ? "settings-page dark" : "settings-page"}>

      <div className="settings-container">

  

        <h1 className="settings-title">
          Settings
        </h1>

        {/* Profile Card */}

        <div className="profile-card">

          <div className="profile-left">

            <div className="profile-image">

              {
                user
                  ? user.charAt(0).toUpperCase()
                  : "U"
              }

            </div>

            <div className="profile-info">

              <h3>
                {
                  user
                    ? user
                    : "InvoiceHub User"
                }
              </h3>

              <p>
                Manage your profile and account settings
              </p>

            </div>

          </div>

          <button
            className="edit-btn"
            onClick={() => setShowEdit(true)}
          >
            Edit Profile
          </button>

        </div>

        {/* EDIT PROFILE FORM */}

        {
          showEdit && (

            <div className="edit-form">

              <h2>Edit Profile</h2>
              <label>
                User Name
              </label>
              <input
                type="text"
                name="userName"
                placeholder="User Name"
                value={profileData.userName}
                onChange={handleChange}
              />
              <label>
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={profileData.email}
                onChange={handleChange}
              />
              <label>
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={profileData.password}
                onChange={handleChange}
              />
              <div className="password-box">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={profileData.password}
                  onChange={handleChange}
                />

                <span
                  className="eye-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </span>

              </div>
              <label>
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={profileData.companyName}
                onChange={handleChange}
              />
              <label>
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                value={profileData.ownerName}
                onChange={handleChange}
              />
              <label>
                Job Position
              </label>

              <input
                type="text"
                name="jobPosition"
                placeholder="Job Position"
                value={profileData.jobPosition}
                onChange={handleChange}
              />
              <label>
                Company Email
              </label>
              <input
                type="email"
                name="companyEmail"
                placeholder="Company Email"
                value={profileData.companyEmail}
                onChange={handleChange}
              />
              <label>
                Company Phone
              </label>

              <input
                type="text"
                name="companyPhone"
                placeholder="Phone Number"
                value={profileData.companyPhone}
                onChange={handleChange}
              />
              <label>
                Company Address
              </label>
              <textarea
                name="companyAddress"
                placeholder="Company Address"
                value={profileData.companyAddress}
                onChange={handleChange}
              />

              <button
                className="save-btn"
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>

            </div>

          )
        }

        {/* Settings Grid */}

        <div className="settings-grid">

          {/* Dark Mode */}

          <div className="setting-card">

            <h3>
              Dark Mode
            </h3>

            <p>
              Enable dark theme for better experience
            </p>

            <div
              className={darkMode ? "toggle active" : "toggle"}
              onClick={handleDarkMode}
            >

              <div className="toggle-circle"></div>

            </div>

          </div>

          {/* Account */}

          <div className="setting-card">

            <h3>
              Account
            </h3>

            <p>
              Logout from your InvoiceHub account
            </p>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
</Layout>
  );
}

export default Settings;
import Sidebar from "./Sidebar";

function Layout({ children }) {

  const darkMode =
    localStorage.getItem("darkMode") === "true";

  return (
    <div className={darkMode ? "dashboard-container dark" : "dashboard-container"}>
      <Sidebar />

      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
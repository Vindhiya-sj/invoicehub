import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaFileInvoice,
  FaReceipt,
  FaWallet,
  FaCog,
FaUserShield }
 from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">InvoiceHub</h2>

      <ul>

        <Link to="/dashboard" className="menu-link">
          <li><FaHome /> Dashboard</li>
        </Link>

        <Link to="/clients" className="menu-link">
          <li><FaUsers /> Clients</li>
        </Link>

        <Link to="/quotation" className="menu-link">
          <li><FaFileInvoice /> Quotations</li>
        </Link>

        <Link to="/invoice" className="menu-link">
          <li><FaReceipt /> Invoices</li>
        </Link>

        <Link to="/payment" className="menu-link">
          <li><FaWallet /> Payments</li>
        </Link>

        <Link to="/settings" className="menu-link">
          <li><FaCog /> Settings</li>
        </Link>
        <Link to="/admin" className="menu-link">
          <li>
            <FaUserShield /> Admin
          </li>
        </Link>
      </ul>

    </div>
  );
}

export default Sidebar;
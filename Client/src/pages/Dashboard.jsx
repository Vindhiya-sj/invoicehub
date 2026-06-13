import "./Dashboard.css";
import { useState, useEffect } from "react";
import {
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import {
  FaHome,
  FaUsers,
  FaFileInvoice,
  FaCog,
  FaReceipt,
  FaWallet
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";
import Layout from "./Layout";

function Dashboard() {

  const navigate = useNavigate();

  const [totalRevenue, setTotalRevenue] =
    useState(0);

  const [totalClients, setTotalClients] =
    useState(0);

  const [user, setUser] = useState("");

  const [invoices, setInvoices] =
    useState([]);

  const [quotations, setQuotations] =
    useState([]);

  const [payments, setPayments] =
    useState([]);

  const darkMode =
localStorage.getItem("darkMode") === "true";

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  useEffect(() => {

    const savedUser =
      localStorage.getItem("userName");

    if (savedUser) {

      setUser(savedUser);

    }

    fetchClients();
    fetchInvoices();
    fetchQuotations();
    fetchPayments();

  }, []);

  // FETCH CLIENTS

  const fetchClients = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/clients"
      );

      setTotalClients(response.data.length);

    }
    catch (error) {

      console.log(error);

    }

  };

  // FETCH INVOICES

  const fetchInvoices = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/invoices"
      );

      setInvoices(response.data);

      const revenue =
        response.data.reduce(

          (total, invoice) =>

            total + Number(invoice.amount),

          0

        );

      setTotalRevenue(revenue);

    }
    catch (error) {

      console.log(error);

    }

  };
  const fetchQuotations = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/quotations"
      );

      setQuotations(response.data);

    }
    catch (error) {

      console.log(error);

    }

  };
  const fetchPayments = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/payments"
      );

      setPayments(response.data);

    }
    catch (error) {

      console.log(error);

    }

  };

  // DELETE INVOICE

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/invoices/${id}`
      );

      const updatedInvoices =
        invoices.filter(
          (invoice) => invoice._id !== id
        );

      setInvoices(updatedInvoices);

      const revenue =
        updatedInvoices.reduce(

          (total, invoice) =>

            total + Number(invoice.amount),

          0

        );

      setTotalRevenue(revenue);

      toast.success(
        "Invoice Deleted"
      );

    }
    catch (error) {

      toast.error(
        "Failed to delete invoice"
      );

    }

  };

  // FILTER

  const filteredInvoices =
    invoices.filter((invoice) => {

      const matchesSearch =

        invoice.client
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        invoice.invoiceNo
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesFilter =

        filterStatus === "All"

        ||

        invoice.status === filterStatus;

      return (
        matchesSearch &&
        matchesFilter
      );

    });

  // BAR CHART DATA
  const chartData = [

    {
      name: "Invoices",
      total: invoices.length
    },

    {
      name: "Clients",
      total: totalClients
    },

    {
      name: "Payments",
      total: payments.length
    }

  ];
  // PIE CHART DATA

  const pieData = [

    {
      name: "Paid",
      value: invoices.filter(
        (inv) => inv.status === "Paid"
      ).length
    },

    {
      name: "Pending",
      value: invoices.filter(
        (inv) => inv.status === "Pending"
      ).length
    },

    {
      name: "Overdue",
      value: invoices.filter(
        (inv) => inv.status === "Overdue"
      ).length
    }

  ];

  const COLORS = [

    "#4CAF50",
    "#FF9800",
    "#F44336"

  ];

  const monthlyRevenue = [
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 0 },
    { month: "May", revenue: 0 },
    { month: "Jun", revenue: 0 },
    { month: "Jul", revenue: 0 },
    { month: "Aug", revenue: 0 },
    { month: "Sep", revenue: 0 },
    { month: "Oct", revenue: 0 },
    { month: "Nov", revenue: 0 },
    { month: "Dec", revenue: 0 }
  ];

  invoices.forEach((invoice) => {

    const monthIndex =
      new Date(invoice.date).getMonth();

    monthlyRevenue[monthIndex].revenue +=
      Number(invoice.amount);

  });

  return (
    <Layout>

        {/* NAVBAR */}

        <div className="navbar">

          <div className="nav-left">

            <h2>
              Dashboard
            </h2>

            <input
              type="text"
              placeholder="Search Invoice..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value)
              }
            >

              <option value="All">
                All
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Overdue">
                Overdue
              </option>

            </select>

          </div>

          <div className="profile-section">

            <p>
              Welcome, {user || "User"}
            </p>

            <div className="profile-circle">

              {
                user
                  ? user.charAt(0).toUpperCase()
                  : "U"
              }

            </div>

          </div>

        </div>


        {/* CARDS */}

        <div className="cards">

          <div className="card">

            <h3>Total Clients</h3>

            <p>{totalClients}</p>

          </div>

          <div className="card">

            <h3>Total Quotations</h3>

            <p>{quotations.length}</p>

          </div>

          <div className="card">

            <h3>Total Invoices</h3>

            <p>{invoices.length}</p>

          </div>

          <div className="card">

            <h3>Pending Payments</h3>

            <p>{payments.length}</p>

          </div>

          <div className="card">

            <h3>Total Revenue</h3>

            <p>₹{totalRevenue}</p>

          </div>

        </div>

        {/* BAR CHART */}

        <div className="chart-section">

          <h2>
            Business Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={chartData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="total"
                fill="#8b5e34"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
        <div className="chart-section">

          <h2>
            Monthly Revenue
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={monthlyRevenue}>

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8b5e34"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>
        {/* PIE CHART */}

        <div className="pie-chart-section">

          <h2>
            Invoice Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >

                {
                  pieData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    )
                  )
                }

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* RECENT INVOICES */}

        <div className="recent-invoices">

          <h2>
            Recent Invoices
          </h2>

          <table>

            <thead>

              <tr>

                <th>Invoice ID</th>

                <th>Client Name</th>

                <th>Amount</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {
                filteredInvoices.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="no-data"
                    >

                      No invoices found

                    </td>

                  </tr>

                ) : (

                  filteredInvoices.map((invoice) => (

                    <tr key={invoice._id}>

                      <td>
                        {invoice.invoiceNo}
                      </td>

                      <td>
                        {invoice.client}
                      </td>

                      <td>
                        ₹{invoice.amount}
                      </td>

                      <td
                        className={
                          invoice.status.toLowerCase()
                        }
                      >
                        {invoice.status}
                      </td>

                      <td className="action-buttons">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(
                              "/invoice",
                              {
                                state: {
                                  invoice
                                }
                              }
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(invoice._id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )
              }

            </tbody>

          </table>

        </div>

      


</Layout>
  );

}

export default Dashboard;
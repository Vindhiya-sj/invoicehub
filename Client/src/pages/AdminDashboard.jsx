import "./AdminDashboard.css";
import Layout from "./Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useEffect,useState } from "react";
function AdminDashboard() {
  const [stats, setStats] = useState({});
    const data = [
  {
    month: "Jan",
    revenue: 5000
  },
  {
    month: "Feb",
    revenue: 7000
  },
  {
    month: "Mar",
    revenue: 10000
  },
  {
    month: "Apr",
    revenue: 8000
  }
];
const [users, setUsers] = useState([]);
useEffect(() => {
  fetchStats();
  fetchUsers();
}, []);
const fetchUsers = async () => {
  const response = await fetch(
    "http://localhost:5000/api/admin/users"
  );

  const data = await response.json();
  setUsers(data);
};
const fetchStats = async () => {
  const response = await fetch(
    "http://localhost:5000/api/admin/stats"
  );

  const data = await response.json();

  setStats(data);
};
  return (
    <Layout>

      <div className="admin-page">

        <h1>Admin Dashboard</h1>

        <div className="admin-cards">

          <div className="admin-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="admin-card">
            <h3>Total Clients</h3>
            <p>{stats.totalClients}</p>
          </div>

          <div className="admin-card">
            <h3>Total Invoices</h3>
            <p>{stats.totalInvoices}</p>
          </div>

          <div className="admin-card">
            <h3>Total Payments</h3>
            <p>{stats.totalPayments}</p>
          </div>

        </div>

      </div>
<div className="admin-card">
  <h3>Total Revenue</h3>
  <p>₹{stats.totalRevenue}</p>
</div>
<div className="users-section">

  <h2>User Management</h2>

  <table>

    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>

      {users.map((user) => (
  <tr key={user._id}>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>
      <button className="delete-btn">
        Delete
      </button>
    </td>
  </tr>
))}

    </tbody>

  </table>

</div>


<div className="chart-section">

  <h2>Revenue Analytics</h2>

  <ResponsiveContainer width="100%" height={300}>

    <BarChart data={data}>

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="revenue"
        fill="#8b5e3c"
      />

    </BarChart>

  </ResponsiveContainer>

</div>
    </Layout>
  );
}

export default AdminDashboard;
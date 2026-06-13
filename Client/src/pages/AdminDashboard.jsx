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
function AdminDashboard() {
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

  return (
    <Layout>

      <div className="admin-page">

        <h1>Admin Dashboard</h1>

        <div className="admin-cards">

          <div className="admin-card">
            <h3>Total Users</h3>
            <p>10</p>
          </div>

          <div className="admin-card">
            <h3>Total Clients</h3>
            <p>25</p>
          </div>

          <div className="admin-card">
            <h3>Total Invoices</h3>
            <p>50</p>
          </div>

          <div className="admin-card">
            <h3>Total Payments</h3>
            <p>40</p>
          </div>

        </div>

      </div>
<div className="admin-card">
  <h3>Total Revenue</h3>
  <p>₹25,000</p>
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

      <tr>
        <td>John</td>
        <td>john@gmail.com</td>

        <td>
          <button className="delete-btn">
            Delete
          </button>
        </td>
      </tr>

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
<div className="activity-section">

<h2>Recent Activities</h2>

<ul>
  <li>User added a Client</li>
  <li>Invoice INV-1001 created</li>
  <li>Payment received</li>
</ul>

</div>
    </Layout>
  );
}

export default AdminDashboard;
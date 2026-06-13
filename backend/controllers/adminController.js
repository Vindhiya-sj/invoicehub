const User = require("../models/User");
const Client = require("../models/Client");
const Invoice = require("../models/Invoice");

const getAdminStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalClients = await Client.countDocuments();

    const totalInvoices = await Invoice.countDocuments();

    const invoices = await Invoice.find();

    const totalRevenue = invoices.reduce(
      (sum, invoice) => sum + Number(invoice.amount),
      0
    );

    res.json({
      totalUsers,
      totalClients,
      totalInvoices,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { getAdminStats };
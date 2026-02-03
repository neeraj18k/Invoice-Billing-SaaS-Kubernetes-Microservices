const axios = require('axios');

const getRevenueReport = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.INVOICE_SERVICE_URL}/api/invoices`);
    const invoices = response.data;

    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

    res.json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClientInvoiceReport = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.INVOICE_SERVICE_URL}/api/invoices/client/${req.params.clientId}`);
    const invoices = response.data;

    const totalBilled = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

    res.json({
      clientId: req.params.clientId,
      invoices,
      totalBilled
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getRevenueReport, getClientInvoiceReport };

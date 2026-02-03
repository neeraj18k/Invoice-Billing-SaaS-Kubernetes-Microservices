const Payment = require('../models/Payment');
const axios = require('axios');

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('invoiceId');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get payments by invoice ID
const getPaymentsByInvoice = async (req, res) => {
  try {
    const payments = await Payment.find({ invoiceId: req.params.invoiceId });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  try {
    // Validate invoice existence via Invoice Service
    const invoiceResponse = await axios.get(`${process.env.INVOICE_SERVICE_URL}/api/invoices/${req.body.invoiceId}`);
    if (!invoiceResponse.data) {
      return res.status(400).json({ error: 'Invalid invoice ID' });
    }

    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(400).json({ error: 'Invoice not found' });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get remaining balance for an invoice
const getRemainingBalance = async (req, res) => {
  try {
    // Get invoice details
    const invoiceResponse = await axios.get(`${process.env.INVOICE_SERVICE_URL}/api/invoices/${req.params.invoiceId}`);
    const invoice = invoiceResponse.data;

    // Get all payments for this invoice
    const payments = await Payment.find({ invoiceId: req.params.invoiceId });

    // Calculate total paid
    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);

    // Calculate remaining balance
    const remainingBalance = invoice.totalAmount - totalPaid;

    res.status(200).json({
      invoiceId: req.params.invoiceId,
      totalAmount: invoice.totalAmount,
      totalPaid: totalPaid,
      remainingBalance: remainingBalance
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPayments,
  getPaymentsByInvoice,
  createPayment,
  getRemainingBalance
};

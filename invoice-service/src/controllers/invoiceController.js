const Invoice = require('../models/Invoice');
const axios = require('axios');

// Get all invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get invoice by ID
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new invoice
const createInvoice = async (req, res) => {
  try {
    // Validate client existence via Client Service
    const clientResponse = await axios.get(`${process.env.CLIENT_SERVICE_URL}/api/clients/${req.body.clientId}`);
    if (!clientResponse.data) {
      return res.status(400).json({ error: 'Invalid client ID' });
    }

    const invoice = new Invoice(req.body);
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(400).json({ error: 'Client not found' });
    }
    res.status(400).json({ error: error.message });
  }
};

// Update an invoice
const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mark invoice as sent
const markAsSent = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, { status: 'sent' }, { new: true });
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an invoice
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get invoices by client
const getInvoicesByClient = async (req, res) => {
  try {
    const invoices = await Invoice.find({ clientId: req.params.clientId });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  markAsSent,
  deleteInvoice,
  getInvoicesByClient   // 👈 ADD THIS
};


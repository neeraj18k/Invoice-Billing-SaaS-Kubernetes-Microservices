const express = require('express');
const router = express.Router();

const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  markAsSent,
  deleteInvoice,
  getInvoicesByClient
} = require('../controllers/invoiceController');

router.post('/', createInvoice);
router.get('/', getAllInvoices);
router.get('/client/:clientId', getInvoicesByClient); // 👈 important
router.get('/:id', getInvoiceById);
router.put('/:id', updateInvoice);
router.patch('/:id/sent', markAsSent);
router.delete('/:id', deleteInvoice);

module.exports = router;

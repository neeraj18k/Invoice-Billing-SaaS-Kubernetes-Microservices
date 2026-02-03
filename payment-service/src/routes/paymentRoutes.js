const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Routes for payment management
router.get('/', paymentController.getAllPayments);
router.get('/invoice/:invoiceId', paymentController.getPaymentsByInvoice);
router.post('/', paymentController.createPayment);
router.get('/balance/:invoiceId', paymentController.getRemainingBalance);

module.exports = router;

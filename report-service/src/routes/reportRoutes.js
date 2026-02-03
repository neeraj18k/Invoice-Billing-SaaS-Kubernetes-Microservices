const express = require('express');
const router = express.Router();
const { getRevenueReport, getClientInvoiceReport } = require('../controllers/reportController');

// 🆕 Ye line add karo, iske bina /api/reports hamesha "Cannot GET" dega
router.get('/', (req, res) => {
  res.json({ message: "Report Service is Up" });
});

router.get('/revenue', getRevenueReport);
router.get('/client/:clientId', getClientInvoiceReport);

module.exports = router;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
  res.send('SBS Financial API is running...');
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests, please try again later.' }
});

const PORT = 5000;

// Initialize Google Service Account Auth
// Requires GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in .env
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
  key: process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : '',
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

// Security Helper: Sanitize inputs to prevent XSS and Formula Injection
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;

  // 1. Context-Aware Output Encoding (XSS mitigation for stored data)
  let sanitized = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  // 2. Prevent Sheets Formula Injection
  if (/^[=+\-@\t\n\r]/.test(sanitized)) {
    sanitized = "'" + sanitized;
  }

  return sanitized;
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;

  if (!fullName || !email || !subject) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newRow = {
    Date: new Date().toLocaleString(),
    'Full Name': sanitizeInput(fullName),
    Email: sanitizeInput(email),
    'Phone Number': sanitizeInput(phone || ''),
    Subject: sanitizeInput(subject),
    Message: sanitizeInput(message || '')
  };

  try {
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      console.warn("Google Sheets credentials are not fully set in .env.");
      return res.status(200).json({ success: true, message: 'Message received (Dev mode: Google Sheets not configured)' });
    }

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    
    // Load document properties and worksheets
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0]; 
    
    // Ensure header row matches our object keys
    try {
      await sheet.setHeaderRow(['Date', 'Full Name', 'Email', 'Phone Number', 'Subject', 'Message']);
    } catch (e) {
      // Header might already exist and be protected, or it might fail if sheet is empty. 
      // We catch this to prevent crashes if setHeaderRow fails.
      console.log('Header row check:', e.message);
    }

    // Append the new row
    await sheet.addRow(newRow);

    res.status(200).json({ success: true, message: 'Message recorded successfully' });
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    res.status(500).json({ error: 'Failed to record message' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

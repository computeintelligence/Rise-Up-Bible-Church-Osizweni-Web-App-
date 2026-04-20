import express, { Request, Response } from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config({ path: '.env.local' });

const app = express();
const port = Number(process.env.PORT) || 3001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// CORS Middleware
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, GIF, and PDF are allowed.'));
    }
  }
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'rubcosizweni.office@gmail.com',
    pass: process.env.EMAIL_PASSWORD || ''
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle ticket registration form submission
app.post('/api/submit-ticket', upload.single('proofOfPayment'), async (req: Request, res: Response) => {
  try {
    const { Full_Name, Email, Ticket_Type } = req.body;

    if (!Full_Name || !Email || !Ticket_Type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!req.file?.buffer) {
      return res.status(400).json({ error: 'Proof of payment file is required' });
    }

    const priceMap: Record<string, number> = {
      General: 250,
      VIP: 500,
      VVIP: 750,
    };
    const price = priceMap[Ticket_Type] ?? 250;

    // Save ticket record to Replit PostgreSQL
    await pool.query(
      `INSERT INTO tickets (full_name, email, ticket_type, price)
       VALUES ($1, $2, $3, $4)`,
      [Full_Name, Email, Ticket_Type, price]
    );

    const emailHTML = `
      <h2>New Gala Dinner Ticket Registration</h2>
      <p><strong>Name:</strong> ${Full_Name}</p>
      <p><strong>Email:</strong> ${Email}</p>
      <p><strong>Ticket Type:</strong> ${Ticket_Type}</p>
      <p><strong>Price:</strong> R${price}</p>
      <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p><em>Proof of payment file attached below</em></p>
    `;

    await transporter.sendMail({
      from: 'rubcosizweni.office@gmail.com',
      to: 'rubcosizweni.office@gmail.com',
      subject: 'New Gala Dinner Ticket Registration',
      html: emailHTML,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
          contentType: req.file.mimetype,
        },
      ],
    });

    res.json({
      success: true,
      message: 'Ticket registration submitted successfully.',
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({
      error: 'Failed to process ticket registration. Please try again.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(port, 'localhost', () => {
  console.log(`Server running on port ${port}`);
});

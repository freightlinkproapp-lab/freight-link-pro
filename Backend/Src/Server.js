import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { PDFDocument } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Load test endpoint
app.get("/api/loads", (req, res) => {
  res.json([
    {
      id: "1",
      pickup: "Atlanta",
      delivery: "Miami",
      price: 2400
    }
  ]);
});

// Payment endpoint
app.post("/api/payments/create-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd"
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contract generation
app.post("/api/contracts/create", async (req, res) => {
  try {
    const { broker, driver, amount } = req.body;

    const contractId = uuidv4();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    page.drawText(`Freight Contract
Broker: ${broker}
Driver: ${driver}
Amount: $${amount}

Driver fee: 3%
`, { x: 50, y: 700 });

    const pdfBytes = await pdfDoc.save();

    res.json({
      contractId,
      pdf: Buffer.from(pdfBytes).toString("base64")
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

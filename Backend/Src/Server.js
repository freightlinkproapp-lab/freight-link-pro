import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { PDFDocument } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";

dotenv.config();


const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}
const stripe = new Stripe(stripeKey);

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, app: "Freight Link Pro" });
});

app.get("/api/loads", (_req, res) => {
  res.json([
    {
      id: "load_1",
      brokerId: "broker_1",
      pickupLocation: "Atlanta, GA",
      deliveryLocation: "Miami, FL",
      loadType: "dry_van",
      price: 2400,
      currency: "USD",
      status: "posted"
    }
  ]);
});

app.post("/api/payments/create-intent", async (req, res) => {
  try {
    const { amount } = req.body;
    const gross = Number(amount);
    const feeAmount = Math.round(gross * 0.03 * 100);
    const totalAmount = Math.round(gross * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { platform_fee_cents: String(feeAmount) }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      grossAmount: gross,
      feeAmount: feeAmount / 100,
      netAmount: (totalAmount - feeAmount) / 100
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/contracts/create", async (req, res) => {
  try {
    const { brokerName, driverName, pickup, delivery, amount } = req.body;
    const contractId = uuidv4();

    const text = `FREIGHT LINK PRO DISPATCH AGREEMENT

Broker: ${brokerName}
Carrier/Driver: ${driverName}
Pickup: ${pickup}
Delivery: ${delivery}
Amount: $${amount}

Broker posting fee: $0.00
Driver platform fee: 3%

By signing below, both parties agree this is a legally binding electronic contract.`;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]);
    page.drawText(text, { x: 50, y: 700, size: 11, maxWidth: 510, lineHeight: 14 });

    const pdfBytes = await pdfDoc.save();

    res.json({
      contractId,
      pdfBase64: Buffer.from(pdfBytes).toString("base64")
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Freight Link Pro backend running on port ${port}`);
});

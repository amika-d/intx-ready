const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const interviewRoutes = require("./routes/interviewRoutes");
const ttsRoutes = require("./routes/ttsRoutes");
const connectDB = require("./config/db");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express(); // Initialize the Express app
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // your React app
  credentials: true,
}));
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

const YOUR_DOMAIN = process.env.CLIENT_URL || 'http://localhost:3000';

// Connect to MongoDB
connectDB();

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// API Routes
app.use("/api", interviewRoutes);
app.use("/api", ttsRoutes);

// Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId } = req.body; // Receive priceId from frontend

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId, // Use the received priceId
          quantity: 1,
        },
      ],
      mode: 'subscription', // Change to 'payment' for one-time payments or 'subscription' for subscriptions
      success_url: `${YOUR_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/payment-cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: error.message });
  }

});

// Get Session Status
app.get('/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    res.json({
      status: session.status,
      customer_email: session.customer_details?.email,
    });
  } catch (error) {
    console.error('Error retrieving session status:', error);
    res.status(500).json({ error: 'Invalid session ID' });
  }
});

// Create Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const YOUR_DOMAIN = process.env.CLIENT_URL;

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
            mode: 'subscription',
            success_url: `${YOUR_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/payment-cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong during session creation' });
    }
});

app.get('/session-status', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        res.json({
            status: session.status,
            customer_email: session.customer_details?.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Invalid session ID' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
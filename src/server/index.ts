import express from 'express';
import dotenv from 'dotenv';
import checkoutRoutes from './api/create-checkout';
import webhookRoutes from './api/stripe-webhook';

dotenv.config();

const app = express();

// Webhook endpoint needs raw body
app.use('/api/webhook', webhookRoutes);

// Other routes can use JSON parsing
app.use(express.json());
app.use('/api', checkoutRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
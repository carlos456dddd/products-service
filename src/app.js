import express from 'express';
import 'dotenv/config';
import productRoutes from './routes/productRoutes.js';

const app = express();
app.use(express.json());
app.use('/products', productRoutes);

app.listen(3002, () => console.log('Products-API on 3002'));
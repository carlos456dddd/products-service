import express from 'express';
import config from 'dotenv';
import aut from './routes/authRoutes.js'



const app = express();
app.use(express.json());



app.use('/api/auth',aut);

app.get('/health', (request, response) => {

    response.json({status:'ok'});
})

export default app;



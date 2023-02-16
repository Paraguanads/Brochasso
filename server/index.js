import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import brochassoRoutes from './routes/brochassoRoutes.js';



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/brochasso', brochassoRoutes);

app.get('/', (req, res) => {
  res.send('Greetings from Brochasso');
})

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server is running ' +
        'on port http://localhost:8080'))
    } catch (e) {
      console.log(e);
    }
}

startServer();
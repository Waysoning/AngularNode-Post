import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import postRoutes from './routes/postRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/post', postRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;

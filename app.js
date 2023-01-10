import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join('images')));

app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;

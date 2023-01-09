import {} from 'dotenv/config';
import app from './app.js';
import sequelize from './db.js';

const port = process.env.PORT || 3001;

const start = async () => {
  app.listen(port, () => {
    sequelize
      .sync()
      .then(() => console.log('Models synced with database'))
      .catch((err) => console.error(err));
    console.log(`Server is running on port: ${port}`);
  });
};

start();

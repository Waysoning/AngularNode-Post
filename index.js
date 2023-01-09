import app from './app.js';

const port = process.env.PORT || 3001;

const start = async () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

start();

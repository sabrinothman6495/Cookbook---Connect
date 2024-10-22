import express from 'express';
import routes from './routes';
import sequalize from './config/db';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

sequalize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
import express from 'express';
import bodyParser from 'body-parser';
import { Router } from 'express';


const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = Router();

// general route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hi there! Welcome to our Questioner api!' });
});

app.use('/api/v1/', router);

app.listen(port, () => {
  console.log(`Questioner app is live at http://127.0.0.1:${port}`);
});

export default app;
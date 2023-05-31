import * as express from 'express';
import * as methodOverride from 'method-override';
import { urlencoded } from 'express';
import './utils/db';

const app = express();

app.use(methodOverride('_method'));
app.use(urlencoded({
  extended: true,
}));

app.get('/', (req, res) => {
  res.send('It works!');
});

app.listen(3000, 'localhost', () => console.log('listening on http://localhost:3000'));

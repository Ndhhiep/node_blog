import express from 'express';
import morgan from 'morgan';
import path from 'path';
import handlebars from 'express-handlebars';
import route from './routes/index.js';
import db from './config/db/index.js';
import moment from 'moment';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
// Http logger
app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Template engine
app.set('views', path.join(__dirname, 'resources', 'views'));
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      formatDate: (date) => moment(date).format('DD/MM/YYYY'),
    },
  }),
);
app.set('view engine', 'hbs');

route(app);

const server = app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

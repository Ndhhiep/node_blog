const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();
const port = 5000;

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
// Http logger
app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template engine
app.set('views', path.join(__dirname, 'resources/views'));
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');

route(app);

app.use((req, res) => {
    res.status(404).send(`Not Found: ${req.method} ${req.originalUrl}`);
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

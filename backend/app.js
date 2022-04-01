const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/user');
const errorHandler = require('./middlewares/errorHandler');
const { userValidator } = require('./middlewares/userValidator');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({
  origin: 'https://mestofront12.students.nomoredomains.work',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', userValidator, login);
app.post('/signup', userValidator, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
app.use((req, res) => res.status(404).send({ message: '404 Ресурс не найден' }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);

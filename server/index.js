//index.js

const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const session = require('express-session');



connectDb();
const app = express();

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);


const corsOptions = {
  origin: process.env.CLIENT,
  credentials: true,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 8080;

app.use(express.json());


app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
})
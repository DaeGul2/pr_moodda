//index.js

const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const session = require('express-session');

/**------ Routers-------- */

const playerRouter = require('./routers/playerRouter');
const gameRouter = require('./routers/gameRouter');
const userRouter = require('./routers/userRouter');
const bettingRouter = require('./routers/bettingRouter');

/**-------Routers End-----*/



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



/**---- attaching routers to App---- */
app.use('/api/players',playerRouter);
app.use('/api/games',gameRouter);
app.use('/api/users',userRouter);
app.use('/api/betting',bettingRouter);


/**--------------------------------- */



app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
})
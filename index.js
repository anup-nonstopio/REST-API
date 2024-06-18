const express = require('express');
const userRouter = require('./routes/user.route');
const dbConnect = require('./DB/dbConnect');
const { logReqRes } = require('./middlewares');

const app = express();
const PORT = process.env.PORT;

//Connect to MongoDB
dbConnect("mongodb://127.0.0.1:27017/REST-API");

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));

//Routes
app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));  
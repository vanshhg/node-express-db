const express = require("express");
const app = express();
const PORT = 8000;
const userRouter = require('./routes/user')
const {connectMdB} = require('./connection');
const {logReqRes} = require('./middleware/index')




app.use(express.urlencoded({extended: false}));


//connnection mongoDb
connectMdB("mongodb://127.0.0.1:27017/yt-app1");

//middleware
app.use(logReqRes('log.txt'));

//router
app.use("/user", userRouter);



app.listen(PORT, () => console.log(`Server Started at: ${PORT}`));
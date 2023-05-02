const express= require('express');

const cors = require('cors');
const {connection} = require("./db")

const {Auth} = require('./middleware/auth.middleware');

const{userRouter} = require('./routes/user.routes');

const{todoRouter} = require('./routes/articles.routes');






const app = express();

app.use(express.json());

app.use(cors())


app.use("/user",userRouter);

app.use(Auth);

app.use("/articles", articlesRouter);


app.listen(4000,async()=>{
    try
    {
        await connection;
        console.log("Connected to DB. Server running at 4000");
    }
    catch(err)
    {
        console.log(err);
        console.log("DB is not connected")
    }

    console.logg("server is running at port 4000.....");
})
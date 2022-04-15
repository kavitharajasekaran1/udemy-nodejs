require('dotenv').config()
const express = require('express');
const app = express();
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require('./middleware/error-handler')
const productrouter = require('./routes/products')
//middlewares

app.use(express.json());
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href ="/api/v1/products">products route</a>')

})
app.use('/api/v1/products',productrouter)
const connectDB = require('./db/connect')
//products route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
let port = process.env.PORT || 3000;

const start =async ()=>{
    try{
        console.log( process.env.MONGO_URI)
        await connectDB(process.env.MONGO_URI);
        //connect DB
app.listen(port, console.log(`server is listening on ${port}`))
    }catch(error){
        console.log(error)
    }
}
start();
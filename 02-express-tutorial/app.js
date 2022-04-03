console.log('Express Tutorial');

const express = require("express");
const app = express();
const products = require('./data')

app.get('api/products/:productID/review/:reviewID',(req,res)=>{
    console.log(req.params)
})
app.get('api/query',(req,res)=>{
    const {search,limit} = req.query;
    let sortedProducts = [...products];
    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))

    }
    if(sortedProducts.length < 1) {
        res.status(200).json({success: true,data:[]})
    }
    return res.status(200).json(sortedProducts)
})


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide the name']
    },
    price:{
        type:Number,
        required:[true,'must provide the price']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company :{
        type:String,
        enum:{
            values:['caressa','ikea','marcos','liddy'],
            message:'{VALUE} is not supported'

    }
}
})

module.exports = mongoose.model('Product',productSchema)

const { query } = require('express')
const Products = require('../models/product')
const getAllProductsStatic = async (req,res)=>{
    const product = await Products.find({}).sort("name").select('name price').limit(4).skip(2)
    res.status(200).json({data:product, nalimit:product.length})
}

const getAllProducts= async (req,res)=>{
    const {featured,company,name,sort,fields} = req.query;
    const queryObject  ={};
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = { $regex: name, $options: 'i' };
    }
    let result = Products.find(queryObject)
    if(sort){
        const sortlist = sort.split(",").join(" ");
        result = result.sort(sortlist)
    } else {
        result = result.sort('createdAt')
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
      }
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      result = result.skip(skip).limit(limit)
    const product = await result
    res.status(200).json({data:product,nbhit:product.length})}

module.exports ={getAllProductsStatic,getAllProducts}
const{CustomeAPIError} = require("../errors/custom-error")
const errorhandler =(err,req,res,next) =>{
    if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({msg:err.message})
    }

    return res.status(500).send({msg:"somthing went . please try again",msges:err})
}
module.exports = errorhandler;
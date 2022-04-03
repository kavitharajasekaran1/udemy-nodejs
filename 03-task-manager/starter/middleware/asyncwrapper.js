const asyncwrapper = (fun)=>{
    return async (req,res,next) =>{
    try{
        await fun(req,res,next)
    }catch(error){
        console.log("error--->>>>",error)
        next(error)
    }
}
}

module.exports = asyncwrapper;
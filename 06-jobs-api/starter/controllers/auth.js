
const User = require('../models/User');
const {BadRequestError,UnauthenticatedError} = require('../errors')
const {StatusCodes} = require('http-status-codes')


const register = async (req,res)=>{
    try{
    console.log("coming")
// if(!name || !email || !password){
//     throw new BadRequestError('Please provide name, email and password')
// }
//we did in modles itselg using pre save
// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password,salt)
// const tempUser ={name,email,password:hashedPassword}

const user = await User.create({...req.body})
const token = user.createJWT()
res.status(StatusCodes.CREATED).json({ user: { name: user.getName() }, token })
}
    catch(error){
        console.log(error)
    }
}
const login = async (req,res)=>{
    const {email,password} = req.body
   
    if(!email || !password){
        throw new BadRequestError('Please proved email and password')
    }
    const user = await User.findOne({email})
    
    
   

    if(!user){
        throw new UnauthenticatedError("Invalid Credentials")
    }
    const token = user.createJWT();
 //compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid Credentials")
    }

    res.status(StatusCodes.OK).json({user: {name:user.name},token})
}

module.exports ={
    register,login
}
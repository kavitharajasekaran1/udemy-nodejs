const jobs = require('../models/Job')
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,NotFoundError} = require('../errors')

const getAllJobs = async (req,res)=>{
    const getalljobs = await jobs.find({createdBy:req.user.userId}).sort("createdAt")
    res.status(StatusCodes.OK).json({jobs:getalljobs,count:getalljobs.length})
}
const getJobs = async (req,res)=>{
    const {
        user: { userId },
        params: { id: jobId },
      } = req;   
      const job = await jobs.findOne({
        _id: jobId,
        createdBy: userId,
      })
      if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
      }
      res.status(StatusCodes.OK).json({ job })
    }
const createJob = async (req,res)=>{
    
    req.body.createdBy = req.user.userId;
    
    const job = await jobs.create(req.body)
    console.log(job,"jobbbb")
    console.log(req.body,"in controller")
    res.status(StatusCodes.CREATED).json(job)
}
const updateJob = async (req,res)=>{
    re.send('getAllJobs')
}
const deleteJob = async (req,res)=>{
    re.send('getAllJobs')
}

module.exports ={
    getAllJobs,
    getJobs,
    createJob,
    updateJob,
    deleteJob
}

const Task = require('../modal/task');
const asyncwrapper = require('../middleware/asyncwrapper')
const getAllTasks =asyncwrapper (async (req,res) =>{
const tasks = await Task.find({});
console.log(tasks,"task----")
 res.status(200).json({tasks})
    
})

const createTask =asyncwrapper (async (req,res) =>{
    console.log(req.body,"my request")
   
        const task = await Task.create(req.body);
       return res.status(200).json(task)
    
  
})
const getTask =asyncwrapper (async (req,res) =>{
    
        const {id: taskID} = req.params;

const task = await Task.findOne({_id: taskID});
if(!task){
    return res.status(404).json({msg:`task is not found for the id ${taskID}`})
}
return res.status(200).json({task})
   
})
const deleteTask = asyncwrapper (async (req,res) =>{
       
            const {id: taskID} = req.params;

            const task = await Task.findOneAndDelete({_id: taskID});
            if(!task){
                return res.status(404).json({msg:`task is not found for the id ${taskID}`})
            }
            return res.status(200).json({task:null,success: true})
       
})
const updateTask = asyncwrapper (async (req,res) =>{
    
        console.log("lll")
        const {id: taskID} = req.params;
        console.log(taskID)
        const task = await Task.findOneAndUpdate({_id: taskID},req.body,{new:true,runValidators:true});
        console.log(task)
        if(!task){
            return res.status(404).json({msg:`task is not found for the id ${taskID}`})
        }

         res.status(200).json({task})
    
})
module.exports ={
    getAllTasks,
    createTask,getTask,
    deleteTask,
    updateTask
}
const express = require('express')
const User  = require('./models/users')
const Task = require('./models/tasks')
const app = express()
require('./db/mongoose')


const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', async (req , res)=>{
    
    try{
        const users = await User.find({})
        res.send(users)
    }catch(error){
        res.status(500).send('Error' + error)
    }
})
app.get('/users/:id' , async (req, res)=>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            res.status(404).send('User not found')
        }
        res.send(user)
    }
    catch(error){
        res.status(500).send(error)
    }
    
})

app.post('/users' , async (req , res)=>{
    const user = new User(req.body)
    
    try{
        await user.save() 
        res.status(201).send(user)
    }catch(error){
        res.status(400).send('Error' + error)
    }
    
})

// app.patch('/user/:id' , async (req , res) =>{
//     const updates = Object.keys(req.body)
//     const allowedItems = ['name' , 'email' , 'password' , 'email' , 'age']
//     const isValidOperation = updates.every((update) =>{allowedItems.includes(update)}) 

//     if(!isValidOperation){
//         return res.status(400).send({error : 'Invalid Update Operation'})
//     }
    
//     const id = req.params.id
//     try{
//         const user  = await User.findByIdAndUpdate(id , req.body , {new : true , runValidators : true}) 
//         if(!user){
//             return res.status(404).send('user not found')
//         } 
//         res.send(user)
//     }
//     catch(error){
//         res.status(400).send(error)
//     }
// })

app.get('/tasks' , async (req , res)=> {
    
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(error){
        res.status(500).send('Error' + error)
    }
})

app.get('/task/:id', async (req, res)=>{
    const _id = req.params.id
    
    try{    
        const task = await Task.findById(_id)
        if(!task){
            res.status(404).send('Task not found')
        }
        res.send(task)
    }catch(error){
        res.status(500).send(error)
    }

    
})



app.post('/tasks' , async (req , res) =>{
    const task = new Task(req.body)
    
    try{
        await task.save()
        res.send(task)
    }
    catch(error){  
        res.status(400).send('Error' + error)
    }

})

// app.patch('/task/:id' , async (req , res)=>{
//     // const updates = Object.keys(req.body)
//     // const allowedItems = ['Status' , 'description']
//     // const isValidOperation = updates.every((update) =>{allowedItems.includes(update)}) 
//     // if(!isValidOperation){
//     //     res.status(404).send({error : 'Invalid Update Operation'})
//     // }
//     // try{
//     //     const id = req.params.id
//     //     const task = await Task.findByIdAndUpdate(id , req.body , {runValidators : true , new : true} )
//     //     if(!task){
//     //         res.status(400).send('No task found')
//     //     }
//     //     res.send(task)
//     // }catch (e) {
//     //     res.status(404).send(e)
//     // }

//     const updates = Object.keys(req.body)
//     const allowedItems = ['description' , 'Status']
//     const isValidOperation = updates.every((update) =>{allowedItems.includes(update)}) 

//     if(!isValidOperation){
//         return res.status(404).send({error : 'Invalid Update Operation'})
//     }
   
//     try{
//         const id = req.params.id
//         const user  = await User.findByIdAndUpdate(id , req.body , {new : true , runValidators : true}) 
//         if(!user){
//             return res.status(404).send('User not found')
//         } 
//         res.send(user)
//     }
//     catch(error){
//         res.status(400).send(error)
//     }
// })

app.patch('/task/:id' , async (req , res) =>{
    const updates = Object.keys(req.body)
    const allowedItems = ['Status' , 'description']
    const isValidOperation =  updates.every((update) => { allowedItems.includes(update)}) 
    if(!isValidOperation){
        return res.status(404).send({error : 'Invalid Update operation'})
    }
    try{
        const id = req.params.id
        const task = await Task.findByIdAndUpdate(id , req.body , {new : true , runValidators : true} )
        if(!task){
            return res.status(404).send('Task is not found')
        }
        res.send(task)
    }catch(error) {
        res.status(404).send(error)
    }
})





app.listen(port , ()=>{
    console.log('Click the link http://localhost:'+ port);
})

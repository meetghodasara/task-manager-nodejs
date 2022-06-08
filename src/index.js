const express = require('express')
const User  = require('./models/users')
const Task = require('./models/tasks')
const task = require('./models/tasks')
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
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send('Error' + error)
    // })
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
    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         res.status(404).send('User not found')
    //     }
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})


app.get('/tasks' , (req , res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((error)=>{
        res.status(500).send('Error' + error)
    })

})

app.get('/task/:id', async (req, res)=>{
    const _id = req.params.id

    try{    
        const task = Task.findById(_id)
        if(!task){
            res.status(404).send('Task not found')
        }
        res.send(task)
    }catch(error){
        res.status(500).send(error)
    }

    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         res.status(404).send('Task not found')
    //     }
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
})

app.post('/users' , async (req , res)=>{
    const user = new User(req.body)
    try{
        await user.save() 
        res.status(201).send(user)
    }catch(error){
        res.status(400).send('Error' + error)
    }
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((error) => {
    //     res.status(400)
    //     res.send('Error' + error)
    // })
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
    // task.save().then(()=>{
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(400)
    //     res.send('Error' + error)
    // })
})



app.listen(port , ()=>{
    console.log('Click the link http://localhost:'+ port);
})

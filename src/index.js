const express = require('express')
const User  = require('./models/users')
const Task = require('./models/tasks')
const task = require('./models/tasks')
const app = express()
require('./db/mongoose')


const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', (req , res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((error)=>{
        res.status(500).send('Error' + error)
    })
})
app.get('/users/:id' , (req, res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            res.status(404).send('User not found')
        }
        res.send(user)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})


app.get('/tasks' , (req , res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((error)=>{
        res.status(500).send('Error' + error)
    })
})

app.get('/task/:id',(req, res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
            res.status(404).send('Task not found')
        }
        res.send(task)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

app.post('/users' , async (req , res)=>{
    const user = new User(req.body)
    await user.save()
    try{
        res.send(user)
    }catch{
        res.status(400)
        res.send('Error' + error)
        
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
    await task.save()
    
    try{
        res.send(task)
    }
    catch{  
        res.status(400)
        res.send('Error' + error)
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

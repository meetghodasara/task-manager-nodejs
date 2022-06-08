const express = require('express')
const userRouter  = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
require('./db/mongoose')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port , ()=>{
    console.log('Click the link http://localhost:'+ port);
})

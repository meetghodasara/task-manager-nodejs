const express = require('express')
const bcrypt = require('bcrypt');
const userRouter  = require('./routers/user')
const taskRouter = require('./routers/task');
const res = require('express/lib/response');
const app = express()
require('./db/mongoose')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port , ()=>{
    console.log('Click the link http://localhost:'+ port);
})

const saltRounds = 8;

const myFunction = async () => {
    const myPlaintextPassword  = 'myPasswordss'
    const hashPassword = await bcrypt.hashSync(myPlaintextPassword, saltRounds);
    console.log(myPlaintextPassword);
    console.log(hashPassword);
    const isMatch = await bcrypt.compare(myPlaintextPassword  , hashPassword)
    console.log(isMatch)
}
myFunction()




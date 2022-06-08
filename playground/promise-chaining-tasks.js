require('../src/db/mongoose')
const Task = require('../src/models/tasks')



const DeleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndRemove(id)
    const count  = await Task.countDocuments({Status : false })
    return count
}
 
DeleteTaskAndCount('629f00b82a412f52b54d1e15').then((count)=>{
    console.log('Total number of incomplete tasks are ' + count);
}).catch((error)=>{
    console.log('Error' + error);
})
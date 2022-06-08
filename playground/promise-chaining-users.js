require("../src/db/mongoose");

const { ConnectionStates } = require("mongoose");
const User = require("../src/models/users");

const updateAgeAndCount = async (id , age) => { 
    ConnectionStates user = await User.findByIdAndUpdate(id , {age} )
    const count = await User.countDocuments({age})
    return count
}
f
updateAgeAndCount('629c8a8bee85d6d03b0c695c' , 5).then((count) => {
    console.log('Total number of people with is ' + count )
}).catch((e) =>{
    console.log('Error' + e)
})
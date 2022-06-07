require("../src/db/mongoose");

const User = require("../src/models/users");

// User.findByIdAndUpdate("629c862600894819c4ef8f96", { age: 4 }, (user) => {
//   console.log(user);
//   return User.countDocuments({ age: 4 });
// })
//   .then((count) => {
//     console.log("Total people with age 1 are : " + count);
//   })
//   .catch((error) => {
//     console.log("Error" + error);
//   });

const updateAgeAndCount = async (id , age) => { 
    const user = await User.findByIdAndUpdate(id , {age} )
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('629c8a8bee85d6d03b0c695c' , 5).then((count) => {
    console.log('Total number of people with is ' + count )
}).catch((e) =>{
    console.log('Error' + e)
})
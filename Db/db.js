//connect to database
const mongoose = require('mongoose')
require('dotenv/config')
mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
       
    }
).then(() => {
    console.log('connected db')
}).catch((e) => {
    console.log("An error occured. Error: ",e)
})
console.log(process.env.DATABASE_URL)

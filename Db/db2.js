const mongoose = require('mongoose')
require('dotenv/config')
mongoose.connect(
    process.env.DATABASE_2_URL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).once('open', () => {
    console.log('connected db')
}
).catch((e) => {
    console.log("An error occured. Error: ",e)
}
)

mongoose.exports = mongoose
let mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/fundoo", { useCreateIndex: true, useNewUrlParser: true })
//event Emiters
mongoose.connection.on("connected", () => {
    console.log("Database connected sucessfully");
})
mongoose.connection.on("disconnected", () => {
    console.log("database Disconnected");
    process.exit(0)
})
mongoose.connection.on("error", () => {
    console.log("database could not be connected")
    process.exit(1)
})

module.exports = mongoose
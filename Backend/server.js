const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const PORT = process.env.PORT || 5400
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_STR)
.then(() => {
    console.log("Connected with mongodb")
})
.catch((error) => {
    console.log("error connecting with mongodb", error)
})

app.use("/", require("./Routes/todoRoute"))
app.use("/", require("./Routes/userRoute"))

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
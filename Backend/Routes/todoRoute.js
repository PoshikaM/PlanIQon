const express = require("express")
const jwt = require("jsonwebtoken")
const Todo = require("../Models/Todo")
const route = express.Router()

const verifyToken = (request, response, next) => {
    const token = request.header("Authorization");
    if(!token)  return res.status(401).json({ error: "Unauthorized" })
    
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return res.status(401).json({ error: "Invalid token" })
        request.userId = decoded.id
        next()
    })
}

route.get("/getTodo", verifyToken, async (request, response) => {
    const todo =  await Todo.find({userID : request.userId})
    response.json(todo)
})

route.post("/postData", verifyToken, async (request, response) => {
    try{
        const data = await Todo.create({
            text : request.body.text,
            userID : request.userId
        })
        response.json(data)
    }
    catch(err){
        console.log(err)
        response.status(500).json({ error: "Failed to create todo" })
    }
    // Todo.create({
    //     text : request.body.text,
    //     userID : request.userID
    // })
    // .then(
    //     data => response.json(data)
    // )
    // .catch(
    //     err =>  console.log(err)
    // )
})

route.put("/:id", verifyToken, async (request, response) => {
    const updatedTodo = await Todo.findByIdAndUpdate(request.params.id,
        {
            text: request.body.text,
            completed: request.body.completed
        },
        { new: true }
    )
    response.json(updatedTodo)
})

route.delete("/:id", verifyToken, async (request, response) => {
    await Todo.findByIdAndDelete(request.params.id)
    response.json({ message: "Todo deleted" });
})

module.exports = route
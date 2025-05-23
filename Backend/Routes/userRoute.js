const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../Models/User")
const route = express.Router()

route.post("/register", async (request, response) => {
    const {name, email, password} = request.body;
    const hashPassword = await bcrypt.hash(password, 10)
    User.create({
        name,
        email,
        password : hashPassword
    })
    .then(
        data => response.json(data)
    )
    .catch(
        err =>  console.log(err)
    )
})

route.get("/users", async (request, response) => {
    try {
        const users = await User.find({}, { password: 0 }); // exclude password field
        response.json(users);
    } catch (err) {
        response.status(500).json({ error: "Failed to fetch users" });
    }
});

route.post("/login", async (request, response) => {
    const {email, password} = request.body
    const user = await User.findOne({email})
    if (!user) return response.status(400).json({error : "User not found"})
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return response.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id : user._id, }, process.env.SECRET_KEY, {expiresIn : "1h"})
    response.json({token, user : {id : user._id, name : user.name}})
})

module.exports = route
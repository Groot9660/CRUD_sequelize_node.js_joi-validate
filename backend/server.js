const express = require('express')
const cors = require('cors')
let server = express()
//middle ware
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
let user = []

//routes
server.get("/", (req, res) => {
    res.send("<h1>Express is Running</h1>")
})

server.post("/signup", (req, res) => {
    user.push(req.body)
    return res.status(200).send({ message: " signed up successfully", success: true })

})

server.post("/login", (req, res) => {
    let { email, password } = req.body
    let isAva = user.filter(ele => {
        if (ele.email == email && ele.password == password) {
            return true
        }

    })
    if (isAva.length > 0) {
       return res.status(200).send({ message: "login successfully", success: true })

    } else {
        return res.status(200).send({ message: "bad credentials", success: false })

    }
})

server.post('/dataOfUser', (req, res) => {
    let { email } = req.body;

    let userData = user.find(Element => {
        if (Element.email == email) {
            return true
        }
    })
    if (!userData) {
        return res.status(200).send({ success: false, message: 'User not found..' })
    } else {
        return res.status(200).send({ success: true, value: userData })
    }
})

server.listen(3000, () => {
    console.log("server is running..");
})
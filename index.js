const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const todoRoutes = require('./routes/Routes')

const app = express()
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
            console.log('db ok')
            app.listen(3000, () => {
                console.log('Run server')
            })
        })
    } catch (error) {
        console.log(error)
    }
}
start()
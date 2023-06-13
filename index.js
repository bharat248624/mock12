const mongoose = require('mongoose')
const express = require('express')
const connection = require('./db')
const jobRoute = require('./routes/job.route')

const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

// app.use('/', (req,res)=>{
//     res.send('hello')
// })

app.use('/jobs', jobRoute)

app.listen(8080, async () => {
    try {
        await connection
    } catch (error) {
        console.log(error.message)
    }

    console.log(`server is connected to the db at port 8080`)
})

const express = require('express')
const jobModel = require('../models/job.models')

const jobRoute = express.Router()

jobRoute.get('/', async (req, res) => {
    let { role, date, techstack,page=1 } = req.query
    let Limit = 10
    console.log(date, role, techstack)
    // console.log(query)
    try {

        if (!role && !date && !techstack) {
            let data = await jobModel.find().limit(10).skip((page-1)*Limit)
            res.send(data)
        }

        if (role) {
            let data = await jobModel.find({ role: role }).limit(10).skip((page-1)*Limit)
            res.send(data)
        }
        if (techstack) {
            console.log('hello')
            let data = await jobModel.find({ language: techstack }).limit(10).skip((page-1)*Limit)
            res.send(data)
        }
        // db.coll.find({$text: {$search: "cake"}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}})
        if (date) {
            if (date == 'asc') {
                let data = await jobModel.find().sort({'postedAt':+1}).limit(10).skip((page-1)*Limit)
                res.send(data)
            } else {
                let data = await jobModel.find().sort({'postedAt':-1}).limit(10).skip((page-1)*Limit)
                res.send(data)
            }
        }


    } catch (error) {
        res.send(error.message)
    }
})

jobRoute.post('/add', async (req, res) => {
    let Data = req.body
    try {
        let data = new jobModel(Data)
        data.save()
        res.send('data has been added')
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = jobRoute

const express = require('express')
const jobModel = require('../models/job.models')

const jobRoute = express.Router()

jobRoute.get('/', async (req, res) => {
    let { role, date, techstack,page=1 } = req.query
    let obj={}
    let Limit = 10
    console.log(date, role, techstack)
    // console.log(query)
    try {

        

        if (role) {
            obj.role = role
        }
        if (techstack) {
           obj.language=techstack
        }

        if(page <= 0){
            page = 1
        }
        if(role){
            if(role=='asc'){
                let data = await jobModel.find(obj).limit(10).skip((page-1)*Limit)
            res.send(data).sort({postedAt:+1})
            } else{
                let data = await jobModel.find(obj).limit(10).skip((page-1)*Limit)
            res.send(data).sort({postedAt:-1})
            }
        }
        // db.coll.find({$text: {$search: "cake"}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}})
        let data = await jobModel.find(obj).limit(10).skip((page-1)*Limit)
            res.send(data)


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
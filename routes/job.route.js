
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
        let values = 0
        if(date){
            console.log(date)
            if(date =='desc'){
                // let data = await jobModel.find(obj).limit(10).skip((page-1)*Limit).sort({postedAt:-1})
                // res.send(data)
                console.log('ok')
                values= -1
            } else{
                // let data = await jobModel.find(obj).limit(10).skip((page-1)*Limit).sort({postedAt:-1})
                // res.send(data)
                values= 1
            }
        }
        
        console.log(values)
        // db.coll.find({$text: {$search: "cake"}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}})
        let data = await jobModel.find(obj).sort({postedAt:values}).limit(10).skip((page-1)*Limit)
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
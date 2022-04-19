const express = require('express')
const router = express.Router()
const _config = require('./../config/app.json')
const Util = require('./../libraries/Utility')
const controller = require('./../controllers')


const api_url = _config.app_base+_config.api._url+_config.api._version

router.get(api_url+'/jobs', (req, res) => {
    controller.lists(req, (state) => {
        Util.resp(res).json(state)
    })
})

router.get(api_url+'/job/overview', (req, res) => {
    controller.job_detail(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.post(api_url+'/candidate', (req, res) => {
    console.log(req.body)
    controller.applicant(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router
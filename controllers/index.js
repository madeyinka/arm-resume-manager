const unirest = require('unirest')
const dotenv = require('dotenv').config()
const Resp = require('./Response')

const DAO = {
    lists: (param, callback) => {
        const url = process.env.baseURL + '/jobs?state=published'
        unirest.get(url)
        .headers({'Authorization': process.env.token})
        .end((response) => {
            return callback(Resp.success({msg:"Records Found", resp:response.body}))
        })
    },

    job_detail: (param, callback) => {
        const url = process.env.baseURL + '/jobs/' + `${param.short_code}`
        unirest.get(url)
        .headers({'Authorization': process.env.token})
        .end((response) => {
            return callback(Resp.success({msg:"Result", resp:response.body}))
        })
    }
} 

module.exports = DAO
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
    },

    applicant: (param, callback) => {
        const error = []
        if (!param.short_code)error.push("ShortCode is Required")
        if (!param.firstname)error.push("First name is required")
        if (!param.lastname)error.push("Last name is required")
        if (!param.email)error.push("Email is required")
        if (!param.phone)error.push("Phone Number is required")
        if (!param.address)error.push("Candidate's Address is required")

        if (error.length === 0) {
            const data = {
                firstname: param.firstname,
                lastname: param.lastname,
                email:param.email,
                phone:param.phone,
                summary:param.summary,
                address:param.address,
                education_entries: param.education_entries,
                experience_entries: param.experience_entries,
                resume:param.resume
            }
            if (data) { 
                const url = process.env.baseURL + '/jobs/' + `${param.short_code}` + '/candidates'
                unirest.post(url)
                .headers({"Content-Type": "application/json", "Authorization": process.env.token, 'Accept': 'application/json'})
                .send({"candidate": data})
                .then((response) => {
                    return callback(Resp.success({msg:"Result", resp:response.body}))
                    //console.log(response.body)
                })
            }
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    }
} 

module.exports = DAO
const _config = require('./../config/app.json')
const dotenv = require('dotenv').config()

const Utility = {
    date_time: function(dt){
        var moment = require('moment-timezone');
        return moment.tz(dt, "Africa/Lagos").format('YYYY-MM-DD HH:mm:ss');
    },

    resp: function(res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res;
    }
}

module.exports = Utility
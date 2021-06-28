const db = require('pg').Pool
module.exports = new db({
    user:"ufsbygsnycbwwa",
    host:"ec2-54-197-100-79.compute-1.amazonaws.com",
    database:"d5sp0gjetnb1tb",
    password:"87c2988b22d606f9145114869e6c2bc485918ed2367ec64bb0273393b9b7d85f",
    port:"5432",
    ssl: {
        rejectUnauthorized: false,
    }
})

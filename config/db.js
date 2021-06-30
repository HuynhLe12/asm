const db = require('pg').Pool
module.exports = new db({
    user:"xtknppgpgqeqyv",
    host:"ec2-35-170-85-206.compute-1.amazonaws.com",
    database:"ddpq0t2n3ooboq",
    password:"e839c728abb82cc8a856e5315cecc301a1f16f88f102d9694b560a8b68c46662",
    port:"5432",
    ssl: {
        rejectUnauthorized: false,
    }
})

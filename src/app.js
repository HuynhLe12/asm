const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')
const db = require('../config/db')
var resultsjson
// Using pg DataBase
db.query("SELECT * FROM product ORDER BY Id ASC", (error, results) =>{
    if(error){
        console.log(error)
        return;
    }
    console.log(results)
    resultsjson = results.rows
})

// Add Values into Database
const Id = "GCS190156"
const product_name = "Sang"
const category = "1"
const price = 1000
const descriptions = "Postgres Database"
db.query("INSERT INTO product (Id, product_name, category, price, descriptions) VALUES ($1, $2, $3, $4, $5)",
[Id, product_name, category, price, descriptions],
(error, results) => {
    if(error){
        console.log(error)
        return;
    }
    console.log(results)
    }
)
// Delete Values From DB
// db.query("DELETE FROM product WHERE id = $1", [Id], (error, results) =>{
//     if(error){
//         console.log(error)
//         return;
//     }
//     console.log("Delete" + results)
// })

app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
})
)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.get('/', function(req, res){
    res.render('home', {product: resultsjson})
})
app.get('/addcustomer', function(req, res){
    res.render('addcustomer')
})
app.get('/listcustomer', function(req, res){
    res.render('listcustomer')
})
app.get('/addorder', function(req, res){
    res.render('addorder')
})
app.get('/listorder', function(req, res){
    res.render('listorder')
})
app.get('/addproduct', function(req,res){
    res.render('addproduct')
})
app.get('/listproduct', function(req, res){
    res.render('listproduct')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server Start Successfully')
})
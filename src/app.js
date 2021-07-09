const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')
const db = require('../config/db')
app.use(express.urlencoded())
app.use(express.json())

////
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



////
app.get('/', function(req, res){
    res.render('home')
})

/*--------------------------------------------*/
//customer
app.get('/addcustomer', function(req, res){
    res.render('addcustomer')
})
app.post('/addcustomer', function(req,res){
    res.render('addcustomer')
    // INSERT
    db.query(`INSERT INTO customer (cus_name, email, phone, address) VALUES ('${req.body.cusname}', '${req.body.email}', '${req.body.phone}', '${req.body.address}')`,
    (error, results) => {
        if(error) throw error
        console.log(results)
        }
    )
    res.redirect('/listcustomer')
})
app.get('/listcustomer', function(req, res){
    db.query("SELECT * FROM customer ORDER BY cusid ASC", (error, results) =>{
        if(error) throw error
        console.log(results)
        res.render('listcustomer', {customer: results.rows})
    })  
})
app.get('/deletecustomer/:cusid', function(req, res){
    db.query(`DELETE FROM customer WHERE cusid = '${req.params.cusid}'`,
    (error) =>{
        if(error) throw error
        res.redirect('/listcustomer')
    })  
})
app.get('/updatecustomer/:cusid', function(req,res){    
    db.query(`SELECT * FROM customer WHERE cusid ='${req.params.cusid}'`, (error, results) =>{
        if(error) throw error
        console.log(results)
        res.render('updatecustomer',{customer: results.rows})
        }
    )

})
app.post('/updatecustomer/:cusid', function(req,res){
    db.query(`UPDATE customer SET cus_name = '${req.body.cusname}' , email = '${req.body.email}', phone = '${req.body.phone}', address = '${req.body.address}' WHERE cusid = '${req.params.cusid}' `,
    (error,results) => {
        if(error) throw error;
        console.log(results)
        res.redirect('/listcustomer');
    })
    
})

/*--------------------------------------------*/
app.get('/addorder', function(req, res){
    res.render('addorder')
})
app.get('/listorder', function(req, res){
    res.render('listorder')
})


/*--------------------------------------------*/
//category
app.get('/addcategory', function(req, res){
    res.render('addcategory')
})
app.post('/addcategory', function(req,res){
    res.render('addcategory')
    const postcateId = req.body.cateid
    const postcateName = req.body.catename
    const postcatedate = req.body.catedate
    
    // INSERT
    db.query("INSERT INTO category (cateid, cate_name, date) VALUES ($1, $2, $3)",
    [postcateId, postcateName, postcatedate],
    (error, results) => {
        if(error) throw error
        console.log(results)
        }
    )
    res.redirect('/listcategory')
})
app.get('/listcategory', function(req, res){
    db.query("SELECT * FROM category ORDER BY cateid ASC", (error, results) =>{
        if(error){
            console.log(error)
            return;
        }
        console.log(results)
        res.render('listcategory', {category: results.rows})
    })  
})
app.get('/deletecategory/:cateid', function(req, res){
    var id = req.params.cateid
    db.query("DELETE FROM category WHERE cateid = $1",
    [id], (error) =>{
        if(error) throw error
        res.redirect('/listcategory')
    })  
})
app.get('/updatecategory/:cateid', function(req,res){    
    db.query(`SELECT * FROM category WHERE cateid ='${req.params.cateid}'`, (error, results) =>{
        if(error) throw error
        console.log(results)
        res.render('updatecategory',{category: results.rows})
        }
    )

})
app.post('/updatecategory/:cateid', function(req,res){
    db.query(`UPDATE category SET cate_name = '${req.body.catename}' , date = '${req.body.catedate}' WHERE cateid = '${req.params.cateid}' `,
    (error,results) => {
        if(error) throw error;
        console.log(results)
        res.redirect('/listcategory');
    })
    
})


/*--------------------------------------------*/
//product
app.get('/addproduct', function(req,res){
    db.query("SELECT * FROM category ORDER BY cateid ASC", (error, results) =>{
        if(error){
            console.log(error)
            return;
        }
        console.log(results)
        res.render('addproduct',{
             category: results.rows
        })  
        }
    )
    

})
app.post('/addproduct', function(req,res){
    const postId = req.body.proid
    const postproName = req.body.proname
    const postcategory = req.body.procategory
    const postprice = req.body.proprice
    const postdescriptions = req.body.prodes
    
    // INSERT
    db.query("INSERT INTO product (id, product_name, category, price, descriptions) VALUES ($1, $2, $3, $4, $5)",
    [postId, postproName, postcategory, postprice, postdescriptions],
    (error, results) => {
        if(error){
            console.log(error)
        }  
        console.log(results)
        }
    )
        res.redirect('/listproduct')
})
app.get('/listproduct', function(req, res){
    db.query("SELECT * FROM product INNER JOIN category ON product.category = category.cateid ORDER BY id ASC", (error, results) =>{
        if(error){
            console.log(error)
            return;
        }
        res.render('listproduct', {product: results.rows})
    })  
})
app.get('/deleteproduct/:id', function(req, res){
    var id = req.params.id
    db.query("DELETE FROM product WHERE id = $1",
    [id], (error) =>{
        if(error) throw error
        res.redirect('/listproduct')
    })  
})
app.get('/updateproduct/:id', function(req,res){
    var id = req.params.id
        console.log(id)
        // Query DB
        db.query("SELECT * FROM product WHERE id = $1", [id], (error, results) => { 
            if(error){
                console.log(error)
            }
            db.query("SELECT * FROM category ORDER BY cateid ASC", (error, results2) => {
                if(error){
                    console.log(error)
                }
                res.render('updateproduct', {product: results.rows, category: results2.rows})
            })
        })
})
app.post('/updateproduct/:id', function(req,res){
    // INSERT
    db.query(`UPDATE product SET product_name = '${req.body.proname}', price = '${req.body.proprice}', category = '${req.body.procategory}', descriptions = '${req.body.prodes}' WHERE id = '${req.params.id}' `,
    (error, results) => {
        if(error) throw error
        console.log(results)
        }
    )
        res.redirect('/listproduct')
})

/*--------------------------------------------*/
//port
app.listen(process.env.PORT || 3000, () => {
    console.log('Server Start Successfully')
})
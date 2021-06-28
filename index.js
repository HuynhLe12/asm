const express = require ('express');
const exphbs  = require('express-handlebars');
const fs = require('fs');
const path = require ('path');
const app = express();
const router = express.Router();
const port = process.env.PORT  || 8888;

//
app.use(express.static(path.join(__dirname ,'public')));
app.engine('hbs', exphbs({
    extname:'.hbs'
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname ,'resources','views'))

//
router.get('/',(req,res)=>{
    res.render('home');
});
router.get('/addcustomer',(req,res)=>{
    res.render('addcustomer');
});
router.get('/addproduct',(req,res)=>{
    res.render('addproduct');
});
router.get('/viewproduct',(req,res)=>{
    res.render('viewproduct');
});
router.get('/viewcustomer',(req,res)=>{
    res.render('viewcustomer');
});
app.use('/', router);
app.listen(port);
console.log(`my app is running at port ${port}`);
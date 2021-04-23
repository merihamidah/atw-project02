const express = require ('express')
const app = express();
const port = 3000
const path = require('path')
const bodyParser = require('body-parser');
const mongoose =require('mongoose');
const { Schema } = mongoose;

app.use(express.urlencoded({ extended:true}));
app.use(express.json());

app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/atw',{useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("horray terkoneksi ")
})

const ProductSchema = new Schema({
    nama : String,
    harga : Number,
    stok : Number
})

const Product = mongoose.model('Product', ProductSchema)

app.get('/',(req,res)=> res.render("template"))
//index produk
app.get('/master-data/products', (req,res) => {
    Product.find({}, (err, items) =>{
        res.render("products/index", {items})
    })
})

//create
app.get('/master-data/products/create', (req,res) => res.render("products/create"))
//store
app.post('/master-data/products', (req,res) => {
   let product = new Product({
       nama : req.body.nama,
       harga : req.body.harga,
       stok : req.body.stok
   })
   .save((err,item) => {
       if(err) res.send("Error Menyimpan Data")
       res.redirect("/master-data/products")

   })   
})
//show
app.get('/master-data/products/:id', (req,res) =>{
    Product.findOne({_id: req.params.id},(err,item)=>{
        if(err) res.render("errors/404")
        res.render("products/show", {item})
    })
})

//edit
app.get('/master-data/products/:id/edit', (req, res) => {
    Product.findOne({ _id: req.params.id }, (err, item) => {
        if (err) res.render("errors/404")
        res.render("products/edit", { item })
    })
})
//update
app.post('/master-data/products/:id', (req, res) => {
    Product.findOne({ _id: req.params.id }, (err, product) => {
        if (err) res.render("errors/404")
        product.nama = req.body.nama
        product.harga = req.body.harga
        product.stok = req.body.stok
        product.save((err,item) => {
            if(err) res.send("Error menyimpan data")
            res.redirect("/master-data/products")
        })
    })
})

//delete
app.get('/master-data/products/:id/delete', (req,res) => {
    Product.deleteOne({_id: req.params.id},(err,product) =>{
    if(err) res.render("errors/404")
    res.redirect("/master-data/products");
     })
})

app.listen(port, ()=> console.log("Server jalan diport "+port))

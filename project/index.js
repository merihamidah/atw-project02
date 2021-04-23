const express = require ('express')
const app = express();
const port = 3000
const path = require('path')
const bodyParser = require('body-parser');
const { Mongoose } = require('mongoose');
const mongoose = require('mongosee')
const {Schema} = mongoose;

app.use(express.urlencoded({ extended:true}));
app.use(express.json());

app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error: '));
db.once('open', function(){
    console.log("horray terkoneksi")
});

const ProductSchema = new Schema({
    nama : String,
    harga : Number,
    stok : Number
})
const Product = mongoose.model('Product', ProdctSchema)

app.get('/',(req,res)=> res.render("template"))

app.get('/master-data/products', (req,res) => res.render("products/index"))
app.get('/master-data/products/create', (req,res) => res.render("products/create"))
app.post('/master-data/products', (req,res) => {
    let product = new Product({
        nama : req.body.nama,
        harga : req.body.harga,
        stok : req.body.stok
    })
    product.save((err, item) => {
        if(err) console.log("Error menyimpan data")
        console.log(item)
        res.send(item)
    })
})
app.listen(port, ()=> console.log("Server jalan diport "+port))

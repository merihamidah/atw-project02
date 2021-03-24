var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('pages/index');
});
app.get('/blog', function(req,res){
    res.render('pages/tentang');
});

app.listen(8000);
console.log('server is okay');
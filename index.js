'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const Product = require('./models/product');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/product', (req, res) => {
  Product.find({}, (error, products)=>{
    if(error) return res.status(500).send({message: "Error al realizar la peticion"});
    if(!products) return res.status(404).send("No se encontro ningun producto");
    res.status(200).send({products});
  });
});

app.get('/api/product/:id', (req, res) => {
  let id = req.params.id;
  Product.findById(id, (error, product)=>{
    if(error) return res.status(500).send({message: "Error al realizar la peticion"});
    if(!product) return res.status(404).send({message: "El producto no existe"});
    res.status(200).send({product});
  });
});

app.post('/api/product', (req, res) => {
  console.log('POST /api/product');
  console.log(req.body);

  let product = new Product();
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((error, productStored)=>{
    if(error) return res.status(500).send({message: `Error al salvar el producto: ${error}`});
    res.status(200).send({product: productStored});
  });
});

app.put('/api/product/:id', (req, res) => {

});

app.delete('/api/product/:id', (req, res) => {

});

mongoose.connect('mongodb://localhost:27017/shop', (error, res)=>{
  if(error) {
    return console.log(`Error al conectar a la base de datos: ${error}`);
  }
  console.log("Conexion a la BD establecida");
  app.listen(port, () => {
    console.log(`<< Servidor inicializado: htttp://localhost:${port} >>\n`);
  });
});

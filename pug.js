const express = require("express");
let { config } = require("./config");
const productoService = require("./utils/productoService");
const pug = require("pug");
const app = express();
const PORT = config.port;

// Para que express pueda interpretar mensaje JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const { Router } = express;
const routerProductos = new Router();

let helper = null;
let productos = [];
if (!helper) {
    helper = new productoService(productos);
}

let arrayProductos = [];

app.set("views", "./views/pug");
app.set("view engine", "pug");

// Devuelve todos los productos
routerProductos.get("/",(req,res,next)=>{

    arrayProductos = helper.getProductos;
    let hayProductos = false;
    
    if(arrayProductos.length > 0){
        hayProductos = true;
    } 
    res.render("producto", {
        productos: arrayProductos,
        productsExists: hayProductos
    });

});

// Da de alta un producto
routerProductos.post("/",(req,res,next)=>{

    const producto = req.body;
    const newProduct = helper.create(producto);
    productos = helper.getProductos;
    
    res.redirect("/");

});

app.use("/productos",routerProductos);
app.use(express.static('public'));

app.listen(PORT, err=>{
    console.log(`Server on http://localhost:${PORT}`);
})

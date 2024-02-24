var ruta = require("express").Router();
var {autorizado, admin} = require("../middlewares/funcionesPassword");
var subirArchivosProd=require("../middlewares/subirArchivosProd");
var { mostrarProductos,  nuevoProducto,  modificarProducto,  buscarPorIDProd,  borrarProducto } = require("../bd/productosBD");

ruta.get("/mostrarProducto", async (req, res) => {
  var productos = await mostrarProductos();
  console.log(productos);
  res.render("usuarios/mostrarProducto", { productos });
});

ruta.get("/nuevoproducto", async (req, res) => {
  res.render("usuarios/nuevoProducto");
});

ruta.post("/nuevoproducto", subirArchivosProd(), async (req, res) => {
    console.log(req.file);
    req.body.fotoProd= req.file.originalname;
    //console.log(req.body);
    var error = await nuevoProducto(req.body);
    //res.end
    res.redirect("/mostrarProducto");
});

ruta.get("/editarProd/:id", async (req, res) => {
  var product = await buscarPorIDProd(req.params.id);
  //console.log(product);
  res.render("usuarios/modificarProducto", { product });
});

ruta.post("/editarProd",subirArchivosProd(), async (req, res) => {
  if (req.file!=undefined){
      req.body.fotoProd=req.file.originalname;
  } 
  else {
      req.body.fotoProd = req.body.fotoViejaProd;
  }
  var error=await modificarProducto(req.body);
  res.redirect("/mostrarProducto");   
});

ruta.get("/borrarProd/:id", async (req, res) => {
  await borrarProducto(req.params.id);
  res.redirect("/mostrarProducto");
});

module.exports = ruta;

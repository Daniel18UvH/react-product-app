var ruta = require("express").Router();
var subirArchivosProd=require("../middlewares/subirArchivosProd");
var { mostrarProductos,  nuevoProducto,  modificarProducto,  buscarPorIDProd,  borrarProducto } = require("../bd/productosBD");
//const subirArchivosProd = require("../middlewares/subirArchivosProd");

ruta.get("/api/mostrarProducto", async (req, res) => {
    var productos = await mostrarProductos();
    //console.log(productos);
    //res.render("usuarios/mostrarProducto", { productos });
    if (productos.length>0)
    res.status(200).json(productos);
    else
    res.status(400).json("No hay productos");
});

ruta.post("/api/nuevoproducto", subirArchivosProd(), async (req, res) => {
    //console.log(req.body);
    req.body.fotoProd=req.file.originalname; 
    var error = await nuevoProducto(req.body);
    if(error==0){
        res.status(200).json("Producto registrado");
    } 
    else{
        res.status(200).json("datos incorrectos");
    }
});


ruta.get("/api/buscarProductoPorId/:id", async (req, res) => {
  var product=await buscarPorIDProd(req.params.id);
  if (product==""){
      res.status(400).json("No se encontro ese producto");
  }
  else {
      res.status(200).json(product);
  }
});

ruta.post("/api/editarProducto", subirArchivosProd(),  async (req, res) => {
    if (req.file!=undefined){
        req.body.fotoProd=req.file.originalname;
    }
    else {
        req.body.fotoProd="algo"
    }
    var error = await modificarProducto(req.body);
    if (error==0){
        res.status(200).json("Producto actualizado");
    } 
    else {
        res.status(400).json("Error al actualizar el producto");
    }
});

ruta.get("/api/borrarProducto/:id", async (req, res) => {
    var error = await borrarProducto(req.params.id);
    if (error==0){
      res.status(200).json("Registro borrado");
    }
    else {
      res.status(400).json("Error al borrar el producto");
    }
});

module.exports = ruta;

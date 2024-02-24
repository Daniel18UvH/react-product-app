var ruta=require("express").Router();
var subirArchivo=require("../middlewares/subirArchivos");
var {autorizado, admin} = require("../middlewares/funcionesPassword");
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario, login}=require("../bd/usuariosBD");

ruta.get("/mostrar", autorizado, async(req, res)=>{
    //console.log(req.session.usuario);
    var usuarios = await mostrarUsuarios();
    res.render("usuarios/mostrar",{usuarios});

});

ruta.get("/nuevousuario", async (req, res)=>{
    res.render("usuarios/nuevo");
});

ruta.post("/nuevousuario", subirArchivo(), async(req, res)=>{
    //console.log(req.file);
    req.body.foto= req.file.originalname;
    //console.log(req.body);
    var error = await nuevoUsuario(req.body);
    //res.end
    res.redirect("/mostrar");
});

ruta.get("/editar/:id",async(req, res)=>{
    var user=await buscarPorID(req.params.id);
    //console.log(user);
    res.render("usuarios/modificar",{user});
});

ruta.post("/editar", subirArchivo(), async(req, res)=>{
    if (req.file!=undefined){
        req.body.foto=req.file.originalname;
    } 
    else {
        req.body.foto = req.body.fotoVieja;
    }
    var error=await modificarUsuario(req.body);
    res.redirect("/mostrar");      
});

ruta.get("/borrar/:id", async(req, res)=>{
    await borrarUsuario(req.params.id);
    res.redirect("/mostrar");
});

ruta.get("/", async (req, res)=>{   
    res.render("usuarios/login");
});

ruta.post("/log", async (req, res)=>{
    var user=await login (req.body);
    if (user==undefined){
        res.redirect("/");
    }
    else{
        if (user.admin){
            console.log("admin");
            req.session.admin=req.body.usuario;
            res.redirect("/nuevoProducto");
        }
        else {
            console.log("usuario");
            req.session.usuario=req.body.usuario;
            res.redirect("/mostrar");
        }
    }
});

ruta.get("/logout", (req,res)=>{
    req.session=null;
    res.redirect("/");
});

module.exports=ruta;
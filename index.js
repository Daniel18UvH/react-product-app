var express=require("express");
var cors=require("cors");
var path=require("path");
//var session=require("express-session");  //Se almacena el servidor 
var session=require("cookie-session");
require("dotenv").config();
var rutas=require("./rutas/usuariosRutas");
var rutaspr=require("./rutas/productoRutas");
var rutasUsuariosApis=require("./rutas/usuariosRutasApis");
var rutasProductosApis=require("./rutas/productoRutasApis");

var app=express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(session({
    name:'session',
    keys:['qwerty123'],
    maxAge: 20 * 60 * 60 * 1000
}));
app.use("/",express.static(path.join(__dirname,"/web")));
app.use("/",rutas);
app.use("/",rutaspr);
app.use("/",rutasUsuariosApis);
app.use("/",rutasProductosApis);

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
}); 
/**
 * Created by Raul Lorenzo on 24/03/2016.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Usuarios = mongoose.model('Usuarios');

//GET - Listar usuarios
router.get('/usuarios', function(req, res, next){
    Usuarios.find(function(err, usuarios){
        if(err){return next(err)}

        res.json(usuarios)
    })
})

//GET - Listar un usuario segun su ID
router.get('/usuario/:id', function(req, res){
    Usuarios.findById(req.params.id, function(err, usuario){
        if(err){res.send(err)}
            
        res.json(usuario);
    })
})

//POST - Agregar usuario
router.post('/usuario', function(req, res, next){
    var usuario = new Usuarios(req.body);

    usuario.save(function(err, usuario){
         if(err){return next(err)}
            res.json(usuario);
    })
})

//PUT - Actualizar usuario
router.put('/usuario/:id', function(req, res){
    Usuarios.findById(req.params.id, function(err, usuario){
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.mail = req.body.mail;
        usuario.nivel = req.body.nivel;

        usuario.save(function(err){
            if(err){res.send(err)}
            
            res.json(usuario);
        })
    })
})

//DELETE - Eliminar usuario
router.delete('/usuario/:id', function(req, res){
    Usuarios.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
            res.json({message: 'El usuario se ha eliminado'});
    })
})

module.exports = router;
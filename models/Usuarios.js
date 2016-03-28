/**
 * Created by Raul Lorenzo on 24/03/2016.
 */

var mongoose = require('mongoose');

var UsuariosSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	mail: String,
	nivel: Number
});

mongoose.model('Usuarios', UsuariosSchema);
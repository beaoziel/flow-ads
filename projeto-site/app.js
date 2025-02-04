process.env.NODE_ENV = 'production';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var leiturasRouter = require('./routes/leituras');
var tipo_usuariosRouter = require('./routes/tipousuarios');
var mercadosRouter = require('./routes/mercados');
var sensoresRouter = require('./routes/sensores');
var geralRouter = require('./routes/visaogeral');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/leituras', leiturasRouter);
app.use('/tipousuarios', tipo_usuariosRouter);
app.use('/mercados', mercadosRouter);
app.use('/sensores', sensoresRouter);
app.use('/visaogeral', geralRouter);

module.exports = app;

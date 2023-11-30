const route= require('express').Router();
const controller = require('../controllers/user.controller');

route.get('/',controller.findAll);
route.get('/all',controller.findOne);

module.exports = route;
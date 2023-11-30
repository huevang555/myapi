var express = require('express');
var router = express.Router();
const user = require('./user.routes');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 router.use('/ticket',user)
module.exports = router;

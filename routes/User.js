var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

/* router.get('/', function(req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
}); */

router.put('/', function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return next(err);
    if (!user) {
    return  res.json({ message: 'email is incorrect' })
    }
    user.password === req.body.password ? res.json({ data: user }) : res.json({ message: 'passwrod is incorrect' })
  });
});

router.post('/', function (req, res, next) {
  User.create(req.body, function (err, user) {
    if (err) return next(err);
    res.json({ data: user });
  });
});

/* router.put('/:id', function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); */
/* 
router.delete('/:id', function (req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); */

module.exports = router;

var express = require('express');
var router = express.Router();
var Load = require('../models/Load.js');

/* GET ALL loads */
router.get('/:id', function (req, res, next) {
  console.log(req.params);
  Load.find({ user_id: req.params.id }, function (err, loads) {
    if (err) return next(err);
    res.json({ data: loads });
  });
});

/* GET SINGLE Load BY ID */
/* router.get('/:id', function (req, res, next) {
  Load.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); */

/* SAVE Load */
router.post('/', function (req, res, next) {
  Load.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json({ data: post });
  });
});

router.post('/search', function (req, res, next) {
  if (req.body.searchBy === 'all') {
    Load.find({ $and: [{ network: req.body.network }, { number: req.body.number }] },
      function (err, post) {
        if (err) return next(err);
        return res.json({ data: post });
      });
  }
  else {
    Load.find({ $or: [{ number: req.body.number }, { network: req.body.network } ] },
      function (err, post) {
        if (err) return next(err);
        return res.json({ data: post });
      });
  }
});

/* UPDATE Load */
/* router.put('/:id', function (req, res, next) {
  Load.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); */

/* DELETE Load */
router.delete('/:id', function (req, res, next) {
  Load.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json({ data: post });
  });
});

module.exports = router;

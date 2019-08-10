var express = require('express');
var router = express.Router();
var Load = require('../models/Load.js');

/* GET ALL loads */
router.get('/history/:id', function (req, res, next) {
  Load.find({ user_id: req.params.id }, function (err, loads) {
    if (err) return next(err);
    res.json({ data: loads });
  });
});

/* SAVE Load */
router.post('/', function (req, res, next) {
  Load.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json({ data: post });
  });
});

router.post('/search/:id', function (req, res, next) {
  if (req.body.searchBy === 'all') {
    Load.find({ $and: [{ user_id: req.params.id }, { network: req.body.network }, { number: req.body.number }] },
      function (err, post) {
        if (err) return next(err);
        return res.json({ data: post });
      });
  }
  else {
    Load.find({
      $and: [
        { user_id: req.params.id },
        {
          $or: [{ number: req.body.number }, { network: req.body.network }]
        }]
    },
      function (err, post) {
        if (err) return next(err);
        return res.json({ data: post });
      });
  }
});

/* DELETE Load */
router.delete('/:id', function (req, res, next) {
  Load.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json({ data: post });
  });
});

module.exports = router;

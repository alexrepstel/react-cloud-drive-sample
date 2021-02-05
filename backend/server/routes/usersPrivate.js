const express = require("express");
const User = require("../models/user.js");

var router = express.Router();

router.post('/getUsers', function(req, res, next) {
    User.find({ }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
});


module.exports = router;


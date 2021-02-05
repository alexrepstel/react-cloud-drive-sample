const express = require("express");
const User = require("../models/user.js");
const Folder = require("../models/folder_model");
const File = require("../models/file_model");
const Version = require("../models/file_versions");
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

router.post('/getFiles', function(req, res, next) {
    File.find({ }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
});

router.post('/getFolder', function(req, res, next) {
    Folder.find({ }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
});

router.post('/getVersions', function(req, res, next) {
    Version.find({ }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
});

module.exports = router;


var express = require('express');
var router = express.Router();
const keys = require('../config/keys');


router.post('/getfolders', function(req, res, next) {
    const folderid = req.body.folderid;
    const Folder = require('../models/folder_model.js');
    Folder.find({ parent_folder_id: folderid}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
});



router.post('/getfiles', 
function(req, res, next) {
  const folderid = req.body.folderid;
  const File = require('../models/file_model.js');
  File.find({ file_folder_id: folderid}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
});


router.post('/getFolderParent', function(req, res, next) {
  const folderid = req.body.folderid;
  const Folder = require('../models/folder_model.js');

  Folder.find({ _id: folderid}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
});



router.post('/addFolder', function(req, res, next) {
  var url = keys.mongoURI;

  var folder_name = req.body.folder_label.replace(" ", "_").toLowerCase();
  var folder_parent_id = req.body.current_folder_id;

  var replyJson = {
    status: "success"
  }
  
  const mongoose = require("mongoose"),
    folderSchema = require("../models/folder_model");
    mongoose.connect(url,
      {
        useNewUrlParser: true
      });

    const db = mongoose.connection;
    db.once("open", () => {
      folderSchema.create(
    {
      folder_name: folder_name, 
      label: req.body.folder_label,
      parent_folder_id: folder_parent_id
        },
        (error, savedDocument) => {
          if(error) console.log(error)
          console.log(savedDocument);
          res.json(replyJson);
        }
      )
    });
});



router.post('/addFile', function(req, res, next) {
  var url = keys.mongoURI;

  var file_name = req.body.file_label;
  var file_folder_id = req.body.current_folder_id;


var date = new Date();
var current_timestamp = Math.round((new Date()).getTime() / 1000);

  var file_type = "";
  function getFileExtension(filename) {
    return filename.split('.').pop();
  }

  var fileExtension = getFileExtension(file_name);

  if(fileExtension == "png" || fileExtension == "jpg" || fileExtension == "jpeg"){
    file_type = "image";
  }else if(fileExtension == "mp4" || fileExtension == "mov"){
    file_type = "video";
  }else if(fileExtension == "pdf"){
    file_type = "pdf";
  }


  var replyJson = {
    status: "success"
  }
  
  const mongoose = require("mongoose"),
  fileSchema = require("../models/file_model");
    mongoose.connect(url,
      {
        useNewUrlParser: true
      });

    const db = mongoose.connection;
    db.once("open", () => {
      fileSchema.create(
    {

      file_name: file_name, 
      file_type: file_type,
      created_ts: current_timestamp, 
      file_folder_id: file_folder_id
    },
        (error, savedDocument) => {
          if(error) console.log(error)
          console.log(savedDocument);
          res.json(replyJson);
        }
      )
    });
});




router.post('/deleteItem', function(req, res, next) {
  const File = require('../models/file_model.js');
  const Folder = require('../models/folder_model.js');

  var request_type =req.body.item_type;

  if(request_type == "file"){
    File.findByIdAndRemove(req.body.delete_file_id, (err, car) => {
      // check if query error
      if (err) {
          console.log(err);
          return res.json({ success: false });
      }else{
        return res.json({ success: true });
      }
    });
  }else if(request_type == "folder"){
    Folder.findByIdAndRemove(req.body.delete_file_id, (err, car) => {
      // check if query error
      if (err) {
          console.log(err);
          return res.json({ success: false });
      }else{
        return res.json({ success: true });
      }
    });
  }
});





router.post('/renameFile', function(req, res, next) {
  var url = keys.mongoURI;

  var file_name = req.body.file_label;
  var file_id = req.body.this_file_id;
    
  const File = require('../models/file_model.js');

var date = new Date();
var current_timestamp = Math.round((new Date()).getTime() / 1000);

  var file_type = "";
  function getFileExtension(filename) {
    return filename.split('.').pop();
  }

  var fileExtension = getFileExtension(file_name);

  if(fileExtension == "png" || fileExtension == "jpg" || fileExtension == "jpeg"){
    file_type = "image";
  }else if(fileExtension == "mp4" || fileExtension == "mov"){
    file_type = "video";
  }else if(fileExtension == "pdf"){
    file_type = "pdf";
  }

  const mongoose = require("mongoose"),
  fileSchema = require("../models/file_model");
    mongoose.connect(url,
      {
        useNewUrlParser: true
      });

    const db = mongoose.connection;
    db.once("open", () => {
      File.findByIdAndUpdate(
        { _id: file_id },
        { file_name: file_name },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    });
});


router.post('/renameFolder', function(req, res, next) {
  var url = keys.mongoURI;

  var folder_name = req.body.folder_label;
  var file_id = req.body.this_file_id;
    
  const Folder = require('../models/folder_model.js');

  const mongoose = require("mongoose"),
  fileSchema = require("../models/file_model");
    mongoose.connect(url,
      {
        useNewUrlParser: true
      });

    const db = mongoose.connection;
    db.once("open", () => {
      Folder.findByIdAndUpdate(
        { _id: file_id },
        { folder_name: folder_name },
        { label: folder_name },
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    });
});


router.post('/updateFileEditingStatus', function(req, res, next) {
  var url = keys.mongoURI;

  var fileid= req.body.file_id;
  var action = req.body.action;

  var replyJson = {
    status: "success"
  }
  
  const mongoose = require("mongoose"),
    LiveEditingFilesSchema = require("../models/live_editing_files");
    LiveEditingFile = require("../models/live_editing_files.js");

    mongoose.connect(url,
      {
        useNewUrlParser: true
      });

    const db = mongoose.connection;
    db.once("open", () => {

      if(action == "check-in"){
        LiveEditingFilesSchema.create(
          {
            file_id: fileid
          },
          (error, savedDocument) => {
            if(error) console.log(error)
            console.log(savedDocument);
            res.json(replyJson);
          }
        )
      }else if(action == "check-out"){
        LiveEditingFile.findOneAndRemove({ file_id: fileid}, function(err){
          return res.json({ success: true });
        });
      }

    });
});


router.post('/getFileEditingStatus', function(req, res, next) {
  const file_id = req.body.file_id;
  const LiveEditingFile = require('../models/live_editing_files');
  LiveEditingFile.find({ file_id: file_id }, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result.length == 0){
            var response = {
                status: "!live"
            }
        }else{
          var response = {
            status: "live"
          }
        }
        res.json(response);
      }
    });
});


router.post('/getVersionsCount', function(req, res, next) {
  const file_id = req.body.file_id;
  FileVersion = require("../models/file_versions");

  var file_ids_array = [];
  var versionCounter = 0;

  FileVersion.find({ }, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        for(var i=0; i < result.length; i++){
          file_ids_array.push(result[i].file_id);
        }
        for(var j=0; j < file_ids_array.length; j++){
            if(file_ids_array[j] == file_id){
              versionCounter = versionCounter + 1;
            }
        }
        console.log(file_ids_array);
        var response = {
          versionCounter: versionCounter
        }
      res.json(response);
      }
  });
});



router.post('/getVersions', function(req, res, next) {
const file_id = req.body.file_id;
FileVersion = require("../models/file_versions");
var foundVersions = [];
FileVersion.find({ }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      for(var i=0; i < result.length; i++){
        if(result[i].file_id == file_id){

            foundVersions.push(result[i]);
          }
      }

    res.json(foundVersions);
    }
});
});

router.post('/addNewVersion', function(req, res, next) {
  var url = keys.mongoURI;
  var file_name = req.body.file_name;
  var file_folder_id = req.body.file_folder_id;

  var original_ver_file_id = req.body.original_ver_file_id;
  var version_key = req.body.version_key;
  var description = req.body.description;


var date = new Date();
var current_timestamp = Math.round((new Date()).getTime() / 1000);

  var file_type = "";
  function getFileExtension(filename) {
    return filename.split('.').pop();
  }
  function getFileNameWithoutExtension(filename){
    var arr = filename.split('.');
    return arr[0];
  }

  var fileExtension = getFileExtension(file_name);

  if(fileExtension == "png" || fileExtension == "jpg" || fileExtension == "jpeg"){
    file_type = "image";
  }else if(fileExtension == "mp4" || fileExtension == "mov"){
    file_type = "video";
  }else if(fileExtension == "pdf"){
    file_type = "pdf";
  }

  file_name = getFileNameWithoutExtension(file_name) + '_v' + version_key + '.' + fileExtension;

  var replyJson = {
    status: "success"
  }
  
  const mongoose = require("mongoose"),
  fileSchema = require("../models/file_model");
  FileVersionSchema = require("../models/file_versions");

    mongoose.connect(url,
      {
        useNewUrlParser: true
      });

    const db = mongoose.connection;
    db.once("open", () => {
      fileSchema.create(
        {

          file_name: file_name, 
          file_type: file_type,
          creator_id: "1", 
          created_ts: current_timestamp, 
          last_modified_ts: "1580145213", 
          allowed_users: "1,3,2", 
          file_folder_id: file_folder_id
        },
            (error, savedDocument) => {
              if(error) console.log(error)
              console.log(savedDocument);
              res.json(replyJson);
            }
      ),
      FileVersionSchema.create(
        {

          file_id: original_ver_file_id,
          version_key: version_key,
          description: description,
          timestamp: current_timestamp
        },
            (error, savedDocument) => {
              if(error) console.log(error)
              console.log(savedDocument);
              // res.json(replyJson);
            }
      );
    });
});


module.exports = router;
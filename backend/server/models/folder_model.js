"use strict";

const mongoose = require("mongoose"),
    folderSchema = mongoose.Schema({
        folder_name: String, 
        label: String, 
        parent_folder_id: String
    });
    
module.exports = mongoose.model("Folder", folderSchema);

"use strict";

const mongoose = require("mongoose"),
    fileSchema = mongoose.Schema({
        file_name: String, 
        file_type: String,
        file_folder_id: String,
        created_ts: String
    });
    
module.exports = mongoose.model("File", fileSchema);

"use strict";

const mongoose = require("mongoose"),
    fileVersionsSchema = mongoose.Schema({
        file_id: String,
        version_key: String,
        description: String,
        timestamp: String
    });
    
module.exports = mongoose.model("FileVersions", fileVersionsSchema);

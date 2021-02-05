"use strict";

const mongoose = require("mongoose"),
    liveEditingFilesSchema = mongoose.Schema({
        file_id: String
    });
    
module.exports = mongoose.model("LiveEditingFiles", liveEditingFilesSchema);

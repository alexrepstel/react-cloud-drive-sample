const keys = require('../server/config/keys');
const undef = "localhost/"+keys.mongoDBname;
module.exports = {
	"undefined": undef,
	"dev": "localhost/DEV_DB_NAME",
	"prod": "localhost/PROD_DB_NAME"
}
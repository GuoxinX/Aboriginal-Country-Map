// Create and connect to database
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var mongodbUri;
// Creates a non-persistent database during testing
if (process.env.NODE_ENV == "test") {
  let Mockgoose = require("mockgoose").Mockgoose;
  let mockgoose = new Mockgoose(mongoose);
  mongodbUri = "mongodb://abbilby1:abbilby1@ds117422.mlab.com:17422/ab_bilby";
  mockgoose.prepareStorage().then(function() {
    mongoose.connect(mongodbUri);
  });
} else {
  mongodbUri = "mongodb://abbilby1:abbilby1@ds131932.mlab.com:31932/ab_bilby";
  mongoose.connect(mongodbUri);
}
//var mongodbUri = "mongodb://abbilby1:abbilby1@ds117422.mlab.com:17422/ab_bilby";
//var mongodbUri = "mongodb://abbilby1:abbilby1@ds131932.mlab.com:31932/ab_bilby";
//mongoose.connect(mongodbUri);

var mongoDB = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
mongoDB.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports.mongoDB = mongoDB;

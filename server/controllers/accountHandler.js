// Require dependencies

var express = require("express");
var controller = express.Router();
var mongoose = require("mongoose");
var genFuncs = require("./generalFunctions.js");
var Promise = require("bluebird");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("#$123JA34N9");
// Connect to the database
var dbConnect = require("../database/connect.js");
var mongoDB = dbConnect.mongoDB;

// Compile appropriate schema into documents
var Account = mongoDB.model("Account");
var PlotProperties = mongoDB.model("PlotProperties");

// Logs user in and resets their authorization token
var login = function(req, res) {
  /*req.body = {
    username: "jonny",
    password: "password1",
    portal: "normal",
  };*/

  // Checks if username and password were received
  if (!req.body.username || !req.body.password) {
    genFuncs.badRequestRes(res);
  } else {
    Account.findOne({ username: req.body.username.toLowerCase() })
      .exec()
      .then(function(user) {
        if (
          req.body.portal == "government" &&
          user.accountType == "government"
        ) {
          validUserType = true;
        } else if (req.body.portal == "normal") {
          validUserType = true;
        } else {
          validUserType = false;
        }
        // username does not exist or invalid user type
        if (!user || !validUserType) {
          res.status(401).json({ error: "Invalid details provided" });
        } else if (user.password === req.body.password) {
          var hashInput = user._id + ":" + Date.now().toString();
          const token = cryptr.encrypt(hashInput);
          res.status(200).json({ token: token, id: user._id });
        }
        // password does not match username
        else {
          res.status(401).json({ error: "Invalid details provided" });
        }
      })
      .catch(function() {
        genFuncs.dbErrorRes(res);
      });
  }
};

//Checks if a user is already in use
var userAvailable = function(username, resolve, reject) {
  Account.find({ username: username.toLowerCase() })
    .exec()
    .then(function(user) {
      // At least one instance was found
      if (user.length !== 0) {
        resolve(false);
      }
      // Username is available
      else {
        resolve(true);
      }
    })
    .catch(function() {
      reject();
    });
};

// Adds a user to the database
var addUser = function(req, res) {
  /*req.body = {
    username: "jonny",
    accountType: "normal",
    password: "password1"
  };*/

  // Checks if type and password were received
  if (!req.body.username || !req.body.accountType || !req.body.password) {
    genFuncs.badRequestRes(res);
  } else {
    //check if user already exists
    var promise = new Promise(function(resolve, reject) {
      userAvailable(req.body.username, resolve, reject);
    });

    promise
      .then(function(available) {
        if (available) {
          account = new Account({
            username: req.body.username,
            accountType: req.body.accountType,
            password: req.body.password
          });

          account.save(function(err) {
            if (!err) {
              genFuncs.successCreated(res);
            } else {
              genFuncs.dbErrorRes(res);
            }
          });
        } else {
          res.status(422).json({ error: "Username is taken." });
        }
      })
      .catch(function() {
        genFuncs.dbErrorRes(res);
      });
  }
};

var editUser = function(req, res) {
  /*req.body = {
    id: "5b9777ee24893e4f6cc0dd5e",
    password: "newpassword",
  };*/

  // Checks if username and password were received
  if (!req.body.id) {
    genFuncs.badRequestRes(res);
  } else {
    var newDetails = {};
    if (req.body.password) {
      newDetails.password = req.body.password;
    }

    Account.findByIdAndUpdate(req.body.id, { $set: newDetails })
      .exec()
      .then(function() {
        genFuncs.successNoData(res);
      })
      .catch(function() {
        genFuncs.dbErrorRes(res);
      });
  }
};

// Deletes all traces of a dog
var deleteUser = function(req, res) {
  /*req.body = {
    id: "5b9777ee24893e4f6cc0dd5e"
  };*/

  if (!req.body.id) {
    genFuncs.badRequestRes(res);
  } else {
    Account.findByIdAndRemove(req.body.id)
      .exec()
      .then(function() {
        genFuncs.successNoData(res);
      })
      .catch(function() {
        genFuncs.dbErrorRes(res);
      });
  }
};

module.exports.login = login;
module.exports.addUser = addUser;
module.exports.editUser = editUser;
module.exports.deleteUser = deleteUser;

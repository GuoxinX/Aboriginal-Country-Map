// Require dependencies
var express = require("express");
var controller = express.Router();
var mongoose = require("mongoose");
var genFuncs = require("./generalFunctions.js");
var Promise = require("bluebird");

// Connect to the database
var dbConnect = require("../database/connect.js");
var mongoDB = dbConnect.mongoDB;

// Compile appropriate schema into documents
var Account = mongoDB.model("Account");
var PlotProperties = mongoDB.model("PlotProperties");

var getUserHistory = function(req, res) {
  /*req.body = {
    id: "5ba5d9e1e942371d58da684c"
  };

  req.headers.authorization = {
    token: "b34c043b17b013d8dee6e3f34a3d711da9f81ea9ef478383d2a581653b33774128cd8c874763a399026c6226cafe"
  };*/

  // Checks if authorization data was provided
  if (!req.headers.authorization) {
    genFuncs.unauthorizedRes(res);
  } else {
    if (!req.body.id) {
      genFuncs.badRequestRes(res);
    } else {
      //validating users token
      token = req.headers.authorization;
      if (genFuncs.isValidUserToken(req.body.id, token, res)) {
        Account.findOne({ _id: req.body.id })
          .exec()
          .then(function(user) {
            var promises = [];
            var all_plots = [];
            var history = user.history;

            history.forEach(function(plotid) {
              promises.push(makePlotPromise(plotid, res, all_plots));
            });

            Promise.all(promises).then(function() {
              res.status(200).json({ plots: all_plots });
            });
          })
          .catch(function(e) {
            console.log(e);
            genFuncs.dbErrorRes(res);
          });
      } else {
        genFuncs.invalidTokenRes(res);
      }
    }
  }
};

var addHistory = function(req, res) {
  /*req.body = {
    id: "5ba5d9e1e942371d58da684c",
    plotID: "AB2"
  };*/

  // Checks if authorization data was provided
  if (!req.headers.authorization) {
    genFuncs.unauthorizedRes(res);
  } else {
    // Checks if id and plotID were received
    if (!req.body.id || !req.body.plotID) {
      genFuncs.badRequestRes(res);
    } else {
      //validating users token
      token = req.headers.authorization;
      if (genFuncs.isValidUserToken(req.body.id, token, res)) {
        Account.findOne({ _id: req.body.id })
          .exec()
          .then(function(user) {
            var newDetails = {};
            if (req.body.plotID) {
              newDetails.history = req.body.plotID;
            }

            Account.findByIdAndUpdate(req.body.id, { $push: newDetails })
              .exec()
              .then(function() {
                genFuncs.successNoData(res);
              })
              .catch(function() {
                genFuncs.dbErrorRes(res);
              });
          })
          .catch(function(e) {
            console.log(e);
            genFuncs.dbErrorRes(res);
          });
      } else {
        genFuncs.invalidTokenRes(res);
      }
    }
  }
};

function makePlotPromise(plotid, res, all_plots) {
  return new Promise(function(solve) {
    PlotProperties.find({ plotID: plotid })
      .exec()
      .then(function(properties) {
        all_plots.push({ plotid, properties });
        solve();
      })
      .catch(function() {
        genFuncs.dbErrorRes(res);
      });
  });
}

// Deletes all traces of a dog
var deleteHistory = function(req, res) {
  /*req.body = {
    id: "5b9777ee24893e4f6cc0dd5e",
    plotID: "AB3"
  };*/
  // Checks if authorization data was provided
  if (!req.headers.authorization) {
    genFuncs.unauthorizedRes(res);
  } else {
    // Checks if id and plotID were received
    if (!req.body.id || !req.body.plotID) {
      genFuncs.badRequestRes(res);
    } else {
      //validating users token
      token = req.headers.authorization;
      if (genFuncs.isValidUserToken(req.body.id, token, res)) {
        Account.findOne({ _id: req.body.id })
          .exec()
          .then(function(user) {
            Account.findByIdAndUpdate(req.body.id, {
              $pull: { history: req.body.plotID }
            })
              .exec()
              .then(function() {
                genFuncs.successNoData(res);
              })
              .catch(function() {
                genFuncs.dbErrorRes(res);
              });
          })
          .catch(function(e) {
            console.log(e);
            genFuncs.dbErrorRes(res);
          });
      } else {
        genFuncs.invalidTokenRes(res);
      }
    }
  }
};

module.exports.getUserHistory = getUserHistory;
module.exports.addHistory = addHistory;
module.exports.deleteHistory = deleteHistory;

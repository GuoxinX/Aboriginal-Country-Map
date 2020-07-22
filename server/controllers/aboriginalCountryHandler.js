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
var AboriginalCountry = mongoDB.model("AboriginalCountry");

// Adds land to the database
var addAboriginalCountry = function(req, res) {
  /*req.body = {
    " aboriginalCountryName": "some name",
    "geometry": "{'type': 'MultiPolygon','coordinates': '[[[[1234, 2345],[2345, 3456],]]]'}"
  }*/
  // Checks if authorization data was provided
  if (!req.headers.authorization) {
    genFuncs.unauthorizedRes(res);
  } else {
    if (!req.body.geometry || !req.body.id || !req.body.aboriginalCountryName) {
      genFuncs.badRequestRes(res);
    } else {
      //validating users token
      token = req.headers.authorization;
      if (genFuncs.isValidUserToken(req.body.id, token, res)) {
        aboriginalCountry = new AboriginalCountry({
          aboriginalCountryName: req.body.aboriginalCountryName,
          geometry: req.body.geometry
        });
        aboriginalCountry.save(function(err) {
          if (!err) {
            genFuncs.successCreated(res);
          } else {
            genFuncs.dbErrorRes(res);
          }
        });
      } else {
        genFuncs.invalidTokenRes(res);
      }
    }
  }
};

var getAboriginalCountries = function(req, res) {
  AboriginalCountry.find({})
    .exec()
    .then(function(aboriginalCountries) {
      res.status(200).json({ aboriginalCountries: aboriginalCountries });
    })
    .catch(function() {
      genFuncs.dbErrorRes(res);
    });
};

// Deletes all traces of an aboriginalCountry
var deleteAboriginalCountry = function(req, res) {
  // Checks if authorization data was provided
  if (!req.headers.authorization) {
    genFuncs.unauthorizedRes(res);
  } else {
    if (!req.body.id || !req.body.userID) {
      genFuncs.badRequestRes(res);
    } else {
      //validating users token
      token = req.headers.authorization;
      if (genFuncs.isValidUserToken(req.body.userID, token, res)) {
        AboriginalCountry.findByIdAndRemove(req.body.id)
          .exec()
          .then(function() {
            genFuncs.successNoData(res);
          })
          .catch(function() {
            genFuncs.dbErrorRes(res);
          });
      } else {
        genFuncs.invalidTokenRes(res);
      }
    }
  }
};

// Edits aboriginalCountry with given data
var editAboriginalCountry = function(req, res) {
  // Checks if authorization data was provided
  if (!req.headers.authorization) {
    genFuncs.unauthorizedRes(res);
  } else {
    // Checks if all parameters were received
    if (
      !req.body.id ||
      !req.body.userID ||
      !req.body.aboriginalCountryName ||
      !req.body.geometry
    ) {
      genFuncs.badRequestRes(res);
    } else {
      //validating users token
      token = req.headers.authorization;
      if (genFuncs.isValidUserToken(req.body.userID, token, res)) {
        var newDetails = {};
        newDetails.aboriginalCountryName = req.body.aboriginalCountryName;
        newDetails.geometry = req.body.geometry;

        AboriginalCountry.findByIdAndUpdate(req.body.id, { $set: newDetails })
          .exec()
          .then(function() {
            genFuncs.successNoData(res);
          })
          .catch(function() {
            genFuncs.dbErrorRes(res);
          });
      } else {
        genFuncs.invalidTokenRes(res);
      }
    }
  }
};

module.exports.addAboriginalCountry = addAboriginalCountry;
module.exports.getAboriginalCountries = getAboriginalCountries;
module.exports.deleteAboriginalCountry = deleteAboriginalCountry;
module.exports.editAboriginalCountry = editAboriginalCountry;

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
var Plot = mongoDB.model("Plot");
var PlotProperties = mongoDB.model("PlotProperties");

// Adds plot to the database
var addPlot = function(req, res) {
  /*req.body = {
    "properties": { "plotID": "AB2",
                    "nativeTitle": "Free Hold",
                    "owner": "Charles Park",
                    "aboriginalPlaceName": "2 years",
                    "hearingYear": "+61420570622",
                    "address": "1002/421, Docklands River Melbourne, Victoria"
                  },
    "geometry": "{'nativeTitle': 'MultiPolygon','coordinates': '[[[[1234, 2345],[2345, 3456],]]]'}"
  }*/
  // Checks if authorization data was provided
  if (!req.headers.authorization) {
    genFuncs.unauthorizedRes(res);
  } else {
    if (
      !req.body.properties ||
      !req.body.properties.plotID ||
      !req.body.geometry ||
      !req.body.id
    ) {
      genFuncs.badRequestRes(res);
    } else {
      //validating users token
      token = req.headers.authorization;
      if (genFuncs.isValidUserToken(req.body.id, token, res)) {
        propertyPaylod = {
          plotID: req.body.properties.plotID,
          address: req.body.properties.address,
          nativeTitle: req.body.properties.nativeTitle,
          hearingYear: req.body.properties.hearingYear,
          aboriginalPlaceName: req.body.properties.aboriginalPlaceName,
          owner: req.body.properties.owner
        };

        property = new PlotProperties(propertyPaylod);

        plot = new Plot({
          plotID: req.body.properties.plotID,
          geometry: req.body.geometry
        });

        property.save(function(err) {
          if (!err) {
            plot.save(function(err) {
              if (!err) {
                genFuncs.successCreated(res);
              } else {
                genFuncs.dbErrorRes(res);
              }
            });
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

//Get information about a plot
var getPlotInformation = function(req, res) {
  // req.body = {
  //   plotID: "FHRT90035"
  // };

  if (!req.body.plotID) {
    genFuncs.badRequestRes(res);
  } else {
    Plot.find({ plotID: req.body.plotID })
      .exec()
      .then(function(plot) {
        PlotProperties.findOne({ plotID: req.body.plotID })
          .exec()
          .then(function(properties) {
            // Confirm success
            plotID = plot[0].plotID;
            geometry = plot[0].geometry;
            res.status(200).json({ plot: { plotID, properties, geometry } });
          })
          .catch(function() {
            genFuncs.dbErrorRes(res);
          });
      })
      .catch(function() {
        genFuncs.dbErrorRes(res);
      });
  }
};

// Edits plot with given data
var editPlot = function(req, res) {
  // Checks if authorization data was provided
  if (!req.headers.authorization) {
    genFuncs.unauthorizedRes(res);
  } else {
    // Checks if all parameters were received
    if (
      !req.body.oldPlotID ||
      !req.body.newPlotID ||
      !req.body.properties ||
      !req.body.geometry ||
      !req.body.properties.plotID ||
      !req.body.properties.nativeTitle ||
      !req.body.properties.owner ||
      !req.body.properties.aboriginalPlaceName ||
      !req.body.properties.hearingYear ||
      !req.body.properties.address ||
      !req.body.id
    ) {
      genFuncs.badRequestRes(res);
    } else {
      //validating users token
      token = req.headers.authorization;
      if (genFuncs.isValidUserToken(req.body.id, token, res)) {
        var plotNewDetails = {};
        var propNewDetails = {};
        plotNewDetails.plotID = req.body.newPlotID;
        plotNewDetails.geometry = req.body.geometry;

        propNewDetails.plotID = req.body.newPlotID;
        propNewDetails.nativeTitle = req.body.properties.nativeTitle;
        propNewDetails.owner = req.body.properties.owner;
        propNewDetails.aboriginalPlaceName =
          req.body.properties.aboriginalPlaceName;
        propNewDetails.hearingYear = req.body.properties.hearingYear;
        propNewDetails.address = req.body.properties.address;

        PlotProperties.findOneAndUpdate(
          { plotID: req.body.oldPlotID },
          { $set: propNewDetails }
        )
          .exec()
          .then(function() {
            Plot.findOneAndUpdate(
              { plotID: req.body.oldPlotID },
              { $set: plotNewDetails }
            )
              .exec()
              .then(function() {
                genFuncs.successNoData(res);
              })
              .catch(function() {
                genFuncs.dbErrorRes(res);
              });
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

// Deletes plot given plotID
var deletePlot = function(req, res) {
  // Checks if authorization data was provided
  if (!req.headers.authorization) {
    genFuncs.unauthorizedRes(res);
  } else {
    // Checks if all parameters were received
    if (!req.body.plotID || !req.body.id) {
      genFuncs.badRequestRes(res);
    } else {
      //validating users token
      token = req.headers.authorization;
      if (genFuncs.isValidUserToken(req.body.id, token, res)) {
        PlotProperties.findOneAndRemove({ plotID: req.body.plotID })
          .exec()
          .then(function() {
            Plot.findOneAndRemove({ plotID: req.body.plotID })
              .exec()
              .then(function() {
                genFuncs.successNoData(res);
              })
              .catch(function() {
                genFuncs.dbErrorRes(res);
              });
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

var getPlots = function(req, res) {
  Plot.find({})
    .exec()
    .then(function(plots) {
      var promises = [];
      var all_plots = [];

      plots.forEach(function(plot) {
        promises.push(makePlotPromise(plot, res, all_plots));
      });

      Promise.all(promises).then(function() {
        //console.log(all_plots);
        res.status(200).json({ plots: all_plots });
      });
    })
    .catch(function() {
      genFuncs.dbErrorRes(res);
    });
};

function makePlotPromise(plot, res, all_plots) {
  return new Promise(function(solve) {
    PlotProperties.findOne({ plotID: plot.plotID })
      .exec()
      .then(function(properties) {
        // Confirm success
        plot_ID = plot.plotID;
        geometry = plot.geometry;
        all_plots.push({ plot_ID, properties, geometry });
        solve();
      })
      .catch(function() {
        genFuncs.dbErrorRes(res);
      });
  });
}

module.exports.addPlot = addPlot;
module.exports.getPlotInformation = getPlotInformation;
module.exports.editPlot = editPlot;
module.exports.deletePlot = deletePlot;
module.exports.getPlots = getPlots;

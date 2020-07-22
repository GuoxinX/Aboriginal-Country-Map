// Require dependencies
var express = require("express");

// Initialise express and router
var app = express();
var router = express.Router();
var aboriginalCountryHandler = require("../controllers/aboriginalCountryHandler.js");
var plotHandler = require("../controllers/plotHandler.js");
var accountHandler = require("../controllers/accountHandler.js");
var accountHistoryHandler = require("../controllers/accountHistoryHandler.js");
var accountBookmarkHandler = require("../controllers/accountBookmarkHandler.js");

// Test route
router.get("/", function(req, res) {
  res.json({ message: "Looking good! ;)" });
});

router.post(
  "/mapGovData/addAboriginalCountry",
  aboriginalCountryHandler.addAboriginalCountry
);
router.get(
  "/mapData/getAboriginalCountries",
  aboriginalCountryHandler.getAboriginalCountries
);
router.post(
  "/mapGovData/deleteAboriginalCountry",
  aboriginalCountryHandler.deleteAboriginalCountry
);
router.post(
  "/mapGovData/editAboriginalCountry",
  aboriginalCountryHandler.editAboriginalCountry
);

router.post("/mapGovData/addPlot", plotHandler.addPlot);
router.post("/mapGovData/deletePlot", plotHandler.deletePlot);
router.post("/mapGovData/editPlot", plotHandler.editPlot);
router.get("/mapData/getPlots", plotHandler.getPlots);
router.post("/mapData/getPlotInformation", plotHandler.getPlotInformation);

/*router.get("/userData/login", accountHandler.login);
router.get("/userData/addUser", accountHandler.addUser);
router.get("/userData/editUser", accountHandler.editUser);
router.get("/userData/deleteUser", accountHandler.deleteUser);
router.get("/userData/getUserHistory", accountHistoryHandler.getUserHistory);
router.get("/userData/addHistory", accountHistoryHandler.addHistory);
router.get(
  "/userData/getUserBookmarks",
  accountBookmarkHandler.getUserBookmarks
);
router.get("/userData/addBookmark", accountBookmarkHandler.addBookmark);
router.get("/userData/deleteHistory", accountHistoryHandler.deleteHistory);
router.get("/userData/deleteBookmark", accountBookmarkHandler.deleteBookmark);*/

router.post("/userData/login", accountHandler.login); //
router.post("/userData/addUser", accountHandler.addUser);
router.post("/userData/editUser", accountHandler.editUser);
router.post("/userData/deleteUser", accountHandler.deleteUser);
router.post("/userData/getUserHistory", accountHistoryHandler.getUserHistory); //
router.post("/userData/addHistory", accountHistoryHandler.addHistory); //
router.post(
  "/userData/getUserBookmarks",
  accountBookmarkHandler.getUserBookmarks
); //
router.post("/userData/addBookmark", accountBookmarkHandler.addBookmark); //
router.post("/userData/deleteHistory", accountHistoryHandler.deleteHistory); //
router.post("/userData/deleteBookmark", accountBookmarkHandler.deleteBookmark); //

module.exports = router;

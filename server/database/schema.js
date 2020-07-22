var mongoose = require("mongoose");

var accountSchema = mongoose.Schema({
  accountType: String,
  username: String,
  password: String,
  bookmarks: [String],
  history: [String]
});

var plotPropertiesSchema = mongoose.Schema({
  plotID: String,
  address: String,
  nativeTitle: String,
  hearingYear: String,
  aboriginalPlaceName: String,
  owner: String
});

var plotSchema = mongoose.Schema({
  plotID: String,
  geometry: String
});

var aboriginalCountrySchema = mongoose.Schema({
  aboriginalCountryName: String,
  geometry: String
});

mongoose.model("Account", accountSchema);
mongoose.model("PlotProperties", plotPropertiesSchema);
mongoose.model("Plot", plotSchema);
mongoose.model("AboriginalCountry", aboriginalCountrySchema);

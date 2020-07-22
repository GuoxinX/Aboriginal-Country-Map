// Constant response strings
const DB_ERR = "Database error.";
const INVALID_REQUEST = "Bad Request";
const UNAUTH_DETAILS = "No authentication token provided or invalid details";
const INVALID_AUTH = "Invalid or expired authentication token provided";
const Cryptr = require("cryptr");
const cryptr = new Cryptr("#$123JA34N9");

var creationErrorCallback = function(err) {
  if (err) {
    res.status(500).json({ error: DB_ERR }); // sends an error if write fails
  }
};

var badRequestRes = function(res) {
  res.status(400).json({ error: INVALID_REQUEST });
};

var unauthorizedRes = function(res) {
  res.status(401).json({ error: UNAUTH_DETAILS });
};

var invalidTokenRes = function(res) {
  res.status(402).json({ error: INVALID_AUTH });
};

var dbErrorRes = function(res) {
  res.status(500).json({ error: DB_ERR });
};

var successNoData = function(res) {
  res.sendStatus(200);
};

var successCreated = function(res) {
  res.sendStatus(201);
};

var isTimeStampExpired = function(timeStamp) {
  var timeStamp = parseInt(timeStamp);
  var oneMinute = 60 * 1000;
  var fifteenMinutes = oneMinute * 15;
  if (Date.now() > timeStamp + fifteenMinutes) {
    return true;
  } else {
    return false;
  }
};

var isValidUserToken = function(userid, token, res) {
  let returnVal = false;
  try {
    returnVal = isValidUserTokenNoTry(userid, token, res);
  } catch (err) {
    returnVal = false;
  }
  return returnVal;
};

var isValidUserTokenNoTry = function(userid, token, res) {
  const decryptedString = cryptr.decrypt(token);
  var array = decryptedString.split(":");
  var tokenUserId = array[0];
  var tokenTimeStamp = array[1];

  if (userid !== tokenUserId) {
    return false;
  } else if (isTimeStampExpired(tokenTimeStamp)) {
    return false;
  }

  return true;
};

module.exports.creationErrorCallback = creationErrorCallback;
module.exports.badRequestRes = badRequestRes;
module.exports.unauthorizedRes = unauthorizedRes;
module.exports.dbErrorRes = dbErrorRes;
module.exports.successNoData = successNoData;
module.exports.successCreated = successCreated;
module.exports.isTimeStampExpired = isTimeStampExpired;
module.exports.isValidUserToken = isValidUserToken;
module.exports.invalidTokenRes = invalidTokenRes;

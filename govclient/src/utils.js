export const tryParseJSON = jsonString => {
  try {
    var o = JSON.parse(jsonString);

    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {}
  return false;
};

export const defaultErrorCallback = error => {
  console.log(JSON.stringify(error));
};

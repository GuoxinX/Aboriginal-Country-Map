import { LOAD_ABORIGINAL_COUNTRY } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    case LOAD_ABORIGINAL_COUNTRY:
      var id = action.id;
      var aboriginalCountries = action.payload.data.aboriginalCountries;

      var myAboriginalCountry = null;
      aboriginalCountries.forEach(aboriginalCountry => {
        if (aboriginalCountry._id === id) {
          myAboriginalCountry = aboriginalCountry;
        }
      });

      return myAboriginalCountry;
    default:
      return state;
  }
}

import { LOGIN } from "../actions";

const initialState = {
  accountName: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state;
    default:
      return state;
  }
}

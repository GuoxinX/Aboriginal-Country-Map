import configureStore from "redux-mock-store";
import * as actions from "../actions";

const mockStore = configureStore();

const initialState = {
  form: null,
  mapdata: {
    aboriginalCountries: [],
    plots: []
  },
  activeAboriginalCountry: null,
  activePlot: null
};

const store = mockStore(initialState);

describe("actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("addAboriginalCountry", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.ADD_ABORIGINAL_COUNTRY
      }
    ];

    const addAboriginalCountry = jest
      .fn()
      .mockImplementation((values, callback, failcallback) => {
        return {
          payload: "request",
          type: actions.ADD_ABORIGINAL_COUNTRY
        };
      });

    store.dispatch(addAboriginalCountry(null, null, null));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("addPlot", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.ADD_PLOT
      }
    ];

    const addPlot = jest
      .fn()
      .mockImplementation((values, callback, failcallback) => {
        return {
          payload: "request",
          type: actions.ADD_PLOT
        };
      });

    store.dispatch(addPlot(null, null, null));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("getAboriginalCountries", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.GET_ABORIGINAL_COUNTRIES
      }
    ];

    const getAboriginalCountries = jest
      .fn()
      .mockImplementation((values, callback) => {
        return {
          payload: "request",
          type: actions.GET_ABORIGINAL_COUNTRIES
        };
      });

    store.dispatch(getAboriginalCountries(null, null));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("getPlots", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.GET_PLOTS
      }
    ];

    const getPlots = jest.fn().mockImplementation((values, callback) => {
      return {
        payload: "request",
        type: actions.GET_PLOTS
      };
    });

    store.dispatch(getPlots(null, null));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("editAboriginalCountry", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.EDIT_ABORIGINAL_COUNTRY
      }
    ];

    const editAboriginalCountry = jest
      .fn()
      .mockImplementation((values, callback, failCallback) => {
        return {
          payload: "request",
          type: actions.EDIT_ABORIGINAL_COUNTRY
        };
      });

    store.dispatch(editAboriginalCountry(null, null, null));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("editPlot", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.EDIT_PLOT
      }
    ];

    const editPlot = jest
      .fn()
      .mockImplementation((values, callback, failCallback) => {
        return {
          payload: "request",
          type: actions.EDIT_PLOT
        };
      });

    store.dispatch(editPlot(null, null, null));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("loadAboriginalCountry", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.EDIT_ABORIGINAL_COUNTRY,
        id: 0
      }
    ];

    const loadAboriginalCountry = jest.fn().mockImplementation(id => {
      return {
        payload: "request",
        type: actions.EDIT_ABORIGINAL_COUNTRY,
        id: id
      };
    });

    store.dispatch(loadAboriginalCountry(0));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("loadPlot", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.EDIT_PLOT
      }
    ];

    const loadPlot = jest.fn().mockImplementation(id => {
      return {
        payload: "request",
        type: actions.EDIT_PLOT
      };
    });

    store.dispatch(loadPlot(0));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("deleteAboriginalCountry", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.DELETE_ABORIGINAL_COUNTRY,
        id: 0
      }
    ];

    const deleteAboriginalCountry = jest.fn().mockImplementation(id => {
      return {
        payload: "request",
        type: actions.DELETE_ABORIGINAL_COUNTRY,
        id: id
      };
    });

    store.dispatch(deleteAboriginalCountry(0));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("deletePlot", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.DELETE_PLOT,
        id: 0
      }
    ];

    const deletePlot = jest.fn().mockImplementation(id => {
      return {
        payload: "request",
        type: actions.DELETE_PLOT,
        id: id
      };
    });

    store.dispatch(deletePlot(0));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("login", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.LOGIN
      }
    ];

    const login = jest
      .fn()
      .mockImplementation((values, callback, failCallback) => {
        return {
          payload: "request",
          type: actions.LOGIN
        };
      });

    store.dispatch(login(null, null, null));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("register", () => {
    const expectedActions = [
      {
        payload: "request",
        type: actions.REGISTER
      }
    ];

    const register = jest
      .fn()
      .mockImplementation((values, callback, failCallback) => {
        return {
          payload: "request",
          type: actions.REGISTER
        };
      });

    store.dispatch(register(null, null, null));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  getDetAreas,
  addHistory,
  getHistory,
  deleteHistory,
  getPlots
} from "../actions";
import { connect } from "react-redux";
import "../css/Map.css";
import "../css/mapbox-gl-geocoder.css";
import PropTypes from "prop-types";
import GeoJSON from "geojson";
import parseJson from "parse-json";

import { bindActionCreators } from "redux";
import _ from "lodash";

import Drawer from "./Drawer";
import Legend from "./Legend";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmlzZWR4IiwiYSI6ImNqa3Jva2U5NDAwOWkzcXBmc2Rod2ZiZWgifQ.LSgR9iATRQ_tM2G0WeAkJA";

const legend = {
  fill: {
    property: "nativeTitle",
    stops: [
      ["Area where native title does not exist", "#00ff00"],
      ["Areas to which Section 47A and 47B NTA Apply", "#00ffff"],
      ["Areas the subject of non-exclusive native title", "#FF4500"]
    ]
  }
};

const ausCoord = [144.966314, -37.799396];
const opacity = 0.3;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoPlotData: null,
      geoDetAreaData: null,
      drawerOpen: true,
      plotProperties: {
        plotID: "To begin, select a plot",
        address: "To begin, select a plot",
        nativeTitle: "To begin, select a plot",
        hearingYear: "To begin, select a plot",
        aboriginalPlaceName: "To begin, select a plot",
        owner: "To begin, select a plot"
      },
      styleLoaded: false,
      historyState: false,
      history: []
    };
  }
  map;
  popup;
  geocoder;
  marker;

  getID(e) {
    return e.features[0].properties.plotID;
  }

  plotGeocoder = query => {
    if (this.state.geoDetAreaData != null && this.state.geoPlotData != null) {
      let matchingFeatures = [];
      const plotData = this.state.geoPlotData;
      const detAreaData = this.state.geoDetAreaData;
      _.forEach(plotData.features, function(value) {
        let feature = value;
        if (
          value.properties.plotID.toLowerCase().search(query.toLowerCase()) !==
            -1 ||
          value.properties.address.toLowerCase().search(query.toLowerCase()) !==
            -1
        ) {
          feature["place_name"] =
            feature.properties.plotID +
            ", " +
            feature.properties.address +
            ", " +
            feature.properties.aboriginalPlaceName;
          feature["bbox"] = feature.properties.bbox;
          matchingFeatures.push(feature);
        }
      });
      _.forEach(detAreaData.features, function(value) {
        let feature = value;
        if (
          value.properties.aboriginalCountryName
            .toLowerCase()
            .search(query.toLowerCase()) !== -1
        ) {
          feature["place_name"] = feature.properties.aboriginalCountryName;
          feature["bbox"] = feature.properties.bbox;
          matchingFeatures.push(feature);
        }
      });
      return matchingFeatures;
    }
  };

  showMarker = centre => {
    //console.log(plot);
    // Calls to the searchPlot can be made like this:
    // this.props.searchPlot("AB1", "plotID");
    this.marker.setLngLat(centre).addTo(this.map);
  };

  handlePlotClick = properties => {
    this.setState({ plotProperties: properties, drawerOpen: true });
  };

  handleToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleSearch = query => {
    if (this.geocoder != null) {
      this.geocoder.query(query);
    }
  };

  handleGetHistory = callback => {
    this.props.getHistory(
      { token: this.props.token, id: this.props.id },
      historyCallback => {
        this.storeHistory(historyCallback);
        callback();
      },
      () => {}
    );
  };

  handleDeleteHistory = (properties, callback, failCallback) => {
    this.props.deleteHistory(
      { token: this.props.token, id: this.props.id, plotID: properties.plotID },
      () => {
        this.handleGetHistory(() => {});
        callback();
      },
      () => {
        failCallback();
      }
    );
  };

  storeHistory = callback => {
    const newHistory = [];
    _.forEach(_.reverse(callback.data.plots), function(value) {
      newHistory.push(value);
    });
    this.setState({
      history: newHistory
    });
  };

  handleAddHistory = (properties, callback, failCallback) => {
    this.props.addHistory(
      { token: this.props.token, id: this.props.id, plotID: properties.plotID },
      () => {
        this.handleGetHistory(() => {});
        callback();
      },
      () => {
        failCallback();
      }
    );
  };

  handleNewHistory = properties => {
    this.handleDeleteHistory(
      properties,
      () => {
        this.handleAddHistory(
          properties,
          () => {
            this.handleGetHistory(() => {
              const entryLimit = 20;

              const historyLength = this.state.history.length;

              if (historyLength > entryLimit) {
                const lastID = this.state.history[historyLength - 1]
                  .properties[0].plotID;
                this.props.handleDeleteHistory(
                  {
                    token: this.props.token,
                    id: this.props.id,
                    plotID: lastID
                  },
                  callback => {},
                  () => {}
                );
              }
            });
          },
          () => {}
        );
      },
      () => {}
    );
  };

  loadPlots = () => {
    this.map.addSource("plots", {
      type: "geojson",
      data: this.state.geoPlotData
    });

    this.map.addLayer({
      id: "plotsFill",
      type: "fill",
      source: "plots",
      paint: {
        "fill-color": {
          property: legend.fill.property,
          stops: legend.fill.stops,
          type: "categorical"
        },
        "fill-opacity": opacity
      }
    });

    this.map.setLayerZoomRange("plotsFill", 8, 24);

    this.map.addLayer({
      id: "plotsLine",
      type: "line",
      source: "plots",
      paint: {
        "line-width": 2
      }
    });

    this.map.setLayerZoomRange("plotsLine", 8, 24);
    this.map.setFilter("plotsLine", ["==", "type", "DEFAULT"]);
  };

  loadDetAreas = () => {
    this.map.addSource("detAreas", {
      type: "geojson",
      data: this.state.geoDetAreaData
    });

    this.map.addLayer({
      id: "detAreas",
      type: "line",
      source: "detAreas",
      paint: {
        "line-width": 2,
        "line-color": "#6B238E"
      }
    });
  };

  componentDidUpdate(prevProps) {
    // setup plot data
    if (this.props.plotResult !== prevProps.plotResult) {
      const plotData = _.filter(
        _.map(this.props.plotResult, prepPlotData),
        function(o) {
          return o != null;
        }
      );
      //console.log(plotData);

      this.setState({
        geoPlotData: GeoJSON.parse(plotData, { GeoJSON: "geometry" })
      });
    }

    // setup aboriginal country data
    if (this.props.detAreaResult !== prevProps.detAreaResult) {
      const detAreaData = _.map(this.props.detAreaResult, prepDetAreaData);
      //console.log(this.props.detAreaResult);
      this.setState({
        geoDetAreaData: GeoJSON.parse(detAreaData, {
          GeoJSON: "geometry"
        })
      });
    }
    if (
      this.state.styleLoaded === true &&
      this.map.getSource("plots") == null &&
      this.map.getSource("detAreas") == null &&
      this.state.geoDetAreaData != null &&
      this.state.geoPlotData != null
    ) {
      this.loadDetAreas();
      this.loadPlots();
    }

    if (
      this.props.token !== prevProps.token &&
      this.props.token !== "" &&
      this.props.id !== ""
    ) {
      this.handleGetHistory(() => {});
    }

    if (
      this.props.token !== prevProps.token &&
      this.props.token === "" &&
      this.props.id === ""
    ) {
      this.setState({ history: [] });
    }
  }

  componentDidMount() {
    this.props.getPlots();
    this.props.getDetAreas();

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      // center on Australia
      center: ausCoord,
      zoom: 10,
      minZoom: 4
    });

    this.setState({ styleLoaded: true });

    this.map.on("load", () => {
      // mapbox geocoder search
      this.geocoder = new MapboxGeocoder({
        accessToken:
          "pk.eyJ1IjoibmlzZWR4IiwiYSI6ImNqa3Jva2U5NDAwOWkzcXBmc2Rod2ZiZWgifQ.LSgR9iATRQ_tM2G0WeAkJA",
        country: "au",
        localGeocoder: this.plotGeocoder,
        placeholder:
          "Search by plot ID, address, suburb or Aboriginal country name"
      });

      this.geocoder.on("result", rs => {
        const properties = rs.result.properties;

        if (properties != null && properties.plotID != null) {
          this.showMarker(properties.centre);
          this.handlePlotClick(properties);
          console.log(properties.plotID);
          if (this.props.token !== "" && this.props.id !== "") {
            this.handleNewHistory(properties);

            /*if (this.state.initial) {
              this.setState({initial: false});
              this.handleNewHistory(properties);
            }
            else if (!this.state.ignoreSearch) {
              this.handleNewHistory(properties);

            }*/
            //this.setState({ignoreSearch: !this.state.ignoreSearch});
          }
        }
      });

      this.map.addControl(this.geocoder, "top-left");
      this.map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      this.popup = new mapboxgl.Popup({
        closeOnClick: false
      });

      this.marker = new mapboxgl.Marker();

      this.map.on("mousemove", "plotsFill", e => {
        this.map.getCanvas().style.cursor = "pointer";
        this.map.setFilter("plotsLine", ["==", "plotID", this.getID(e)]);
      });

      this.map.on("mouseleave", "plotsFill", () => {
        this.map.getCanvas().style.cursor = "";
        this.map.setFilter("plotsLine", ["==", "type", "DEFAULT"]);
      });

      // click can be changed to mouseover for popup when mouse is moved over the plot

      this.map.on("click", "plotsFill", e => {
        if (e.lngLat != null) {
          let properties = e.features[0].properties;
          this.handlePlotClick(properties);
          this.showMarker(e.lngLat);
        }
      });
    });
  }

  render() {
    return (
      <div>
        <div ref={el => (this.mapContainer = el)} className="MapBody" />
        <Drawer
          open={this.state.drawerOpen}
          plot={this.state.plotProperties}
          toggleDrawer={() => this.handleToggle()}
          makeSearch={query => this.handleSearch(query)}
          token={this.props.token}
          id={this.props.id}
          historyState={this.state.historyState}
          history={this.state.history}
          handleGetHistory={this.handleGetHistory}
          handleDeleteHistory={this.handleDeleteHistory}
        />
        <Legend
          className="PlotLegend"
          legend={legend.fill.stops}
          opacity={opacity}
        />
      </div>
    );
  }
}

function prepPlotData(raw) {
  const geo = parseJson(raw.geometry);
  if (isEmpty(geo)) {
    return null;
  }
  let processed = raw.properties;
  processed.bbox = findBounds(geo);
  processed.centre = findCentre(processed.bbox);
  processed.geometry = geo;
  return processed;
}

function prepDetAreaData(raw) {
  const geo = parseJson(raw.geometry);
  if (isEmpty(geo)) {
    return null;
  }

  const processed = {
    geometry: geo,
    aboriginalCountryName: raw.aboriginalCountryName,
    bbox: findBounds(geo)
  };
  return processed;
}

function findBounds(geo) {
  var minX, minY, maxX, maxY;
  if (geo.type === "Polygon") {
    minX = geo.coordinates[0][0][0];
    maxX = geo.coordinates[0][0][0];
    minY = geo.coordinates[0][0][1];
    maxY = geo.coordinates[0][0][1];
    _.forEach(geo.coordinates[0], function(value) {
      if (value[0] < minX) {
        minX = value[0];
      } else if (value[0] > maxX) {
        maxX = value[0];
      }
      if (value[1] < minY) {
        minY = value[1];
      } else if (value[1] > maxY) {
        maxY = value[1];
      }
    });
  } else {
    minX = geo.coordinates[0][0][0][0];
    maxX = geo.coordinates[0][0][0][0];
    minY = geo.coordinates[0][0][0][1];
    maxY = geo.coordinates[0][0][0][1];
  }
  _.forEach(geo.coordinates, function(a) {
    _.forEach(a, function(b) {
      _.forEach(b, function(value) {
        if (value[0] < minX) {
          minX = value[0];
        } else if (value[0] > maxX) {
          maxX = value[0];
        }
        if (value[1] < minY) {
          minY = value[1];
        } else if (value[1] > maxY) {
          maxY = value[1];
        }
      });
    });
  });
  const offsetX = maxX - minX;
  const offsetY = (maxY - minY) / 5;
  return [minX - offsetX, minY - offsetY, maxX + offsetX, maxY + offsetY];
}

function findCentre(bbox) {
  const x = (bbox[0] + bbox[2]) / 2;
  const y = (bbox[1] + bbox[3]) / 2;
  return [x, y];
}

function mapStateToProps(state) {
  return {
    detAreaResult: state.mapdata.detAreas,
    plotResult: state.mapdata.plots
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPlots: getPlots,
      getDetAreas: getDetAreas,
      deleteHistory: deleteHistory,
      getHistory: getHistory,
      addHistory: addHistory
    },
    dispatch
  );
}

function isEmpty(geo) {
  return JSON.stringify(geo) === "{}";
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

import React from "react";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import PrintIcon from "@material-ui/icons/Print";
import HelpIcon from "@material-ui/icons/Help";
import MenuIcon from "@material-ui/icons/Menu";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Help from "./Help";
import _ from "lodash";

import { Button, Paper, Typography } from "@material-ui/core";

const background = {
  position: "absolute",
  top: 112,
  right: 12,
  width: 260
};

class Legend extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { legend } = this.props;

    const renderLegend = (stop, i) => {
      return (
        <div key={i} style={{ marginBottom: 5 }}>
          <span>
            <Button
              style={{
                backgroundColor: stop[1],
                width: 70,
                height: 20,
                float: "left",
                opacity: this.props.opacity,
                marginRight: 10
              }}
            />
          </span>
          <span>
            <Typography>{stop[0]}</Typography>
          </span>
        </div>
      );
    };

    return (
      <Paper style={background}>
        <div
          style={{
            margin: 10
          }}
        >
          {legend.map(renderLegend)}
        </div>
      </Paper>
    );
  }
}

export default Legend;

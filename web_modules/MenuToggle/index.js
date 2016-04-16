import React, { Component, PropTypes } from "react"
import Svg from "react-svg-inline"
import HamburgerMenu from "../icons/hamburger-menu.svg"
import styles from "./index.css"

const cx = require("classnames/bind").bind(styles)

export default class MenuToggle extends Component {
  static propTypes = {
    handleToggle: PropTypes.func.isRequired,
    menuVisible: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div
        onClick={ this.props.handleToggle }
        className={ cx("toggle", {
          toggleVisible: this.props.menuVisible,
        }) }
      >
        <Svg svg={ HamburgerMenu } />
      </div>
    )
  }
}

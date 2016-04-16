import React, { Component, PropTypes } from "react"
import styles from "./index.css"
import Svg from "react-svg-inline"
import GithubIcon from "../icons/github.svg"
import FacebookIcon from "../icons/facebook.svg"
// import TwitterIcon from "../icons/twitter.svg"
const cx = require("classnames/bind").bind(styles)

// TODO: Fill in url for social sharing link
export default class Header extends Component {
  static propTypes = {
    dock: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div
        className={ cx("nav", {
          "dock": this.props.dock,
        }) }
      >
        <div className={ cx("right") }>
          <a
            href="https://github.com/daynhauhoc/cppcoban"
            target="_blank"
            data-hint="Fork on Github"
            className={ cx("hint--bottom-left", "iconLink") }
          >
            <Svg svg={ GithubIcon } />
          </a>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u="
            target="_blank"
            data-hint="Share on Facebook"
            className={ cx("hint--bottom-left", "iconLink") }
          >
            <Svg svg={ FacebookIcon } />
          </a>
        </div>
      </div>
    )
  }
}

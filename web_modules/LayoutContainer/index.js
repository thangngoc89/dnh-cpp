/* eslint-disable max-len */
import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import Menu from "../Menu"
import MenuToggle from "../MenuToggle"
import styles from "./index.css"
import classnames from "classnames"

import "normalize.css/normalize.css"
import "github-markdown-css/github-markdown.css"
import "hint.css/hint.css"
import "highlight.js/styles/github.css"

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)

    this.state = {
      menuVisible: false,
      postId: 24016,
    }
  }

  componentDidMount() {
    // Open menu by default on large screen
    if (window.matchMedia("screen and (min-width: 64rem)").matches) {
      this.openMenu()
    }
  }

  onMenuToggleClick = () => {
    this.setState({
      menuVisible: !this.state.menuVisible,
    })
  }
  openMenu = () => {
    this.setState({
      menuVisible: true,
    })
  }

  render() {
    const {
      pkg,
    } = this.context.metadata

    return (
      <div className={ styles.docLayout }>
        <Helmet
          link={ [
            {
              rel: "icon",
              type: "image/png",
              sizes: "144x144",
              href: "//daynhauhoc.s3.amazonaws.com/36ee34de6c73f268424fceaef858c5428d8fb2a976.ico",
            },
            {
              rel: "icon",
              type: "image/png",
              href: "//daynhauhoc.s3.amazonaws.com/352ac0c01c6e4e15be7ee46da53668513fd4e93736.png",
            },
            {
              rel: "apple-touch-icon",
              type: "image/png",
              href: "//daynhauhoc.s3.amazonaws.com/352ac0c01c6e4e15be7ee46da53668513fd4e93736.png",
            },
          ] }
          meta={ [
            { property: "og:site_name", content: pkg.name },
          ] }
        />
        <div
          className={ classnames(styles.body, {
            [styles.bodyVisible]: this.state.menuVisible,
          }) }
        >
          {
            React.cloneElement(this.props.children)
          }
        </div>
        <Menu visible={ this.state.menuVisible } />
        <MenuToggle
          menuVisible={ this.state.menuVisible }
          handleToggle={ this.onMenuToggleClick }
        />
        {
          this.state.menuVisible && <div className={ styles.backdrop } />
        }
      </div>
    )
  }
}

import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import Menu from "../Menu"
import MenuToggle from "../MenuToggle"
import styles from "./index.css"
import classnames from "classnames"

import "normalize.css/normalize.css"
import "github-markdown-css/github-markdown.css"
import "hint.css/hint.css"

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
      menuVisible: true,
    }
  }
  onMenuToggleClick = () => {
    this.setState({
      menuVisible: !this.state.menuVisible,
    })
  }

  render() {
    const {
      pkg,
    } = this.context.metadata

    return (
      <div className={ styles.docLayout }>
        <Helmet
          meta={ [
            { property: "og:site_name", content: pkg.name },
          ] }
        />
        <div
          className={ classnames(styles.body, {
            [styles.bodyVisible]: this.state.menuVisible,
          }) }
        >
          { this.props.children }
        </div>
        <Menu visible={ this.state.menuVisible } />
        <MenuToggle
          menuVisible={ this.state.menuVisible }
          handleToggle={ this.onMenuToggleClick }
        />
      </div>
    )
  }
}

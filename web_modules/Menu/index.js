import React, { Component, PropTypes } from "react"
import styles from "./index.css"
import { Treebeard } from "react-treebeard"
// import Link from "./LinkWithActiveClass"
import data from "../../content/toc.json"

const cx = require("classnames/bind").bind(styles)

export default class Menu extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleOnToggle = (node, toggled) => {
    // if (this.state.cursor) {
    //   this.setState({
    //     cursor: {
    //       active: false,
    //     },
    //   })
    // }
    // node.active = true
    if (node.children) {
      node.toggled = toggled
    }
    this.setState({ cursor: node })
  }

  render() {
    const wrapperClass = cx("menu", "toc-menu", {
      menuVisible: this.props.visible,
    })

    return (
      <div className={ wrapperClass }>
        <Treebeard
          data={ data }
          onToggle={ this.handleOnToggle }
        />
      </div>
    )
  }
}

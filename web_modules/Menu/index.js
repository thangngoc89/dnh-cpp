import React, { Component, PropTypes } from "react"
import styles from "./index.css"
import { Treebeard } from "react-treebeard"
import treeStyle from "./treeStyle"
import decorators from "./decorators"
// import Link from "./LinkWithActiveClass"
import data from "../../content/toc.json"
import { browserHistory } from "phenomic/lib/client"
import { Scrollbars } from "react-custom-scrollbars"
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
    if (this.state.cursor) {
      // eslint-disable-next-line
      this.state.cursor.active = false
    }

    node.active = true
    console.log(node)
    if (node.children) {
      node.toggled = toggled
    }
    this.setState({ cursor: node })

    if (node.path) {
      browserHistory.push(node.path)
    }
  }

  render() {
    const wrapperClass = cx("menu", "toc-menu", {
      menuVisible: this.props.visible,
    })

    return (
      <div className={ wrapperClass }>
        <Scrollbars universal>
          <Treebeard
            style={ treeStyle }
            data={ data }
            decorators={ decorators }
            onToggle={ this.handleOnToggle }
          />
        </Scrollbars>
      </div>
    )
  }
}

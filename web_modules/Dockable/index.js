import React, { Component, PropTypes } from "react"

/*
 * Answer this question
 * Does window.scrollY pass `dockPosition` ?
 */
export default class Dockable extends Component {
  static propTypes = {
    dockPosition: PropTypes.number.isRequired,
    dock: PropTypes.bool,
    component: PropTypes.func.isRequired,
  };

  static defaultProps = {
    dock: true,
  };

  constructor(props) {
    super(props)

    this.state = {
      dock: props.dock,
    }
  }

  componentDidMount() {
    this.addListener()
  }

  componentDidUpdate() {
    this.removeListener()
    this.addListener()
  }

  componentWillUnmount() {
    this.removeListener()
  }

  addListener = () => {
    window.addEventListener("scroll", this.dock)
  }

  removeListener = () => {
    window.removeEventListener("scroll", this.dock)
  }

  dock = () => {
    const dock = window.scrollY < this.props.dockPosition

    if (this.state.dock !== dock) {
      this.setState({
        dock,
      })
    }
  }

  render() {
    const ComponentNeedsToDock = this.props.component
    return (
      <ComponentNeedsToDock
        {...this.props}
        dock={ this.state.dock }
      />
    )
  }
}

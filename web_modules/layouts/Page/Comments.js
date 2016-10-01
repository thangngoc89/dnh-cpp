/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from "react"

export default class Comments extends Component {
  static propTypes = {
    topicId: PropTypes.number,
    discourseUrl: PropTypes.string,
  };

  static defaultProps = {
    topicId: 24016,
    discourseUrl: "//daynhauhoc.com/",
  };

  componentDidMount() {
    this.renderComments()
  }

  componentDidUpdate() {
    this.renderComments()
  }

  renderComments = () => {
    window.DiscourseEmbed = undefined

    if (this._node) {
      this._node.innerHTML = null
    }

    const DiscourseEmbed = window.DiscourseEmbed = {
      discourseUrl: this.props.discourseUrl,
      topicId: this.props.topicId,
    }

    const d = document.createElement("script")
    d.type = "text/javascript"
    d.async = true
    d.src = DiscourseEmbed.discourseUrl + "javascripts/embed.js"
    document.getElementsByTagName("body")[0].appendChild(d)
  }

  render() {
    return (
      <div
        id="discourse-comments"
        ref={ (ref) => this._node = ref }
      />
    )
  }
}

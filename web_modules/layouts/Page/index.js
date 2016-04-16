import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import invariant from "invariant"
import styles from "./index.css"
import Header from "../../Header"
import Dockable from "../../Dockable"
import PencilIcon from "../../icons/pencil.svg"
import Svg from "react-svg-inline"

const cx = require("classnames/bind").bind(styles)

export default class Page extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string.isRequired,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata

    const {
      __filename,
      __url,
      head,
      body,
    } = this.props

    invariant(
      typeof head.title === "string",
      `Your page '${ __filename }' needs a title`
    )

    const metaTitle = head.metaTitle ? head.metaTitle : head.title

    const meta = [
      { property: "og:type", content: "article" },
      { property: "og:title", content: metaTitle },
      { property: "og:url", content: __url },
      { property: "og:description", content: head.description },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: metaTitle },
      { name: "twitter:creator", content: `@${ pkg.twitter }` },
      { name: "twitter:description", content: head.description },
      { name: "description", content: head.description },
    ]

    return (
      <div>
        <Helmet
          title={ metaTitle }
          meta={ meta }
        />
        <Dockable dockPosition={ 80 } component={ Header } />
        <article className="markdown-body">
          {
            head.title &&
            <h1>
              { head.title }
              <a
                href="https://github.com/"
                className={ cx("hint--bottom-left", "pencil") }
                data-hint="Sửa bài viết trên Github"
                target="_blank"
              >
                <Svg svg={ PencilIcon } />
              </a>
            </h1>
          }
          {
            body &&
            <div
              dangerouslySetInnerHTML={ { __html: body } }
            />
          }
        </article>
      </div>
    )
  }
}

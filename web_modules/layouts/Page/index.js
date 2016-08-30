import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import invariant from "invariant"
import Header from "../../Header"
import Dockable from "../../Dockable"
import { BodyContainer } from "phenomic"
import "./index.css"

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

  componentDidMount() {
    const DiscourseEmbed = window.DiscourseEmbed = {
      discourseUrl: "http://daynhauhoc.com/",
      topicId: this.props.head.id || 24016,
    }

    const d = document.createElement("script")
    d.type = "text/javascript"
    d.async = true
    d.src = DiscourseEmbed.discourseUrl + "javascripts/embed.js"
    document.getElementsByTagName("body")[0].appendChild(d)
  }

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
      `Your page "${ __filename }" needs a title`
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
            </h1>
          }
          {
            body &&
            <BodyContainer>{ body }</BodyContainer>
          }
        </article>
        <div id="discourse-comments">Loading comments...</div>
      </div>
    )
  }
}

import React, { Component, PropTypes } from "react"
import styles from "./index.css"
import Link from "./LinkWithActiveClass"
import toc from "./toc.json"

const cx = require("classnames/bind").bind(styles)

export default class Menu extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  };

  render() {
    const wrapperClass = cx("menu", "toc-menu", {
      menuVisible: this.props.visible,
    })

    return (
      <div className={ wrapperClass }>
      <ul>
        {
          Object.keys(toc).map((lv1) => {
            const lv2s = toc[lv1]

            return (
              <li
                key={ lv1 }
                className={ cx("level-1", {
                  "parent": lv2s,
                }) }
              >
                {
                  typeof lv2s === "string" &&
                  <Link
                    to={ toc[lv1] }
                    className={ cx("title", "link") }
                  >
                    { lv1 }
                  </Link>
                }
                {
                  typeof lv2s === "object" && lv2s &&
                  <span className={ cx("title", "link") }>{ lv1 }</span>
                }
                {
                  typeof lv2s === "object" && lv2s &&
                  <ul>
                    {
                      Object.keys(lv2s).map((lv2) => (
                        <li
                          key={ lv2 }
                          className={ cx("level-2") }
                        >
                          <Link
                            className={ cx("title", "link") }
                            to={ lv2s[lv2] }
                          >
                            { lv2 }
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                }
              </li>
            )
          })
        }
      </ul>
      </div>
    )
  }
}

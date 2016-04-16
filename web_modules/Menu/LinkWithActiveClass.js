import React, { PropTypes } from "react"
import Link from "phenomic/lib/Link"
import styles from "./index.css"

const cx = require("classnames/bind").bind(styles)

const LinkWithActiveClass = ({ children, ...props }) => (
  <Link
    activeClassName={ cx("active") }
    {...props}
  >
    { children }
  </Link>
)

LinkWithActiveClass.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LinkWithActiveClass

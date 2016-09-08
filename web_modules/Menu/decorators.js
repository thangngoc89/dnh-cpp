/* eslint-disable max-len */
/* eslint-disable react/no-multi-comp */
import React from "react"
import decorators from "react-treebeard/lib/components/decorators"

const Toggle = ({ style }) => {
  const height = style.height
  const width = style.width

  return (
    <div style={ style.base }>
      <div style={ style.wrapper }>
        <svg width={ width } height={ height } viewBox="0 0 50 85" xmlSpace="preserve">
          <polyline
            style={ style.arrow }
            points="0.375,0.375 45.63,38.087 0.375,75.8"
          />
        </svg>
      </div>
    </div>
  )
}

Toggle.propTypes = {
  style: React.PropTypes.object,
}

const Header = ({ style, node }) => {
  if (!node.hasOwnProperty("path") && node.level !== 1) {
    console.log(node.name)
    return (
      <div style={ style.base }>
        <div
          style={ {
            ...style.title,
            ...style.titleNull,
          } }
        >
          { node.name }
        </div>
      </div>
    )
  }
  return (
    <div style={ style.base }>
      <div
        style={ {
          ...style.title,
          ...(node.level === 0 && style.titleLv0),
          ...(node.level === 1 && style.titleLv1),
        } }
      >
        { node.name }
      </div>
    </div>
  )
}

Header.propTypes = {
  style: React.PropTypes.object,
  node: React.PropTypes.object.isRequired,
}
export default {
  ...decorators,
  // Toggle,
  Header,
}

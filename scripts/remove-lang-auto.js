/* eslint-disable */
/**
 * @fileoverview
 *   Remove class `lang-auto` code tags.
 * @example
 *   Input <code class="lang-auto"></code>
 *   Output <code></code>
 */

var visit = require('unist-util-visit');

module.exports = removeScriptType;

function removeScriptType() {
  return transform;
}

function transform(tree) {
  visit(tree, 'element', visitor);
}

function visitor(node) {
  var props = node.properties;

  if (node.tagName === "code") {
    if (
      "className" in props &&
      props.className.indexOf("lang-auto") > -1
    ) {
      props.className = null;
    }
  }
}

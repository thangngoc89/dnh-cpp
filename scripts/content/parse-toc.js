const omitEmpty = require("omit-empty")

export default function generateMd(data) {
  let headingPos = 0
  const linkRegex = /\[([^\]]+)\]\((.+)\)/

  const tree = {
    name: "root",
    children: [],
  }
  const lines = data.split("\n")

  for (const lineId in lines) {

    const line = lines[lineId]
        // OK so this is a heading
    if (line.startsWith("###")) {
      tree.children.push({
        name: line.substring(4, line.length),
        children: [],
      })
    }
        // This is a link
    else if (linkRegex.test(line)) {
      const name = line.replace(linkRegex, "$1")
      const link = line.replace(linkRegex, "$2")

      if (name.startsWith("*")) {
        const allChildren = tree.children[headingPos].children
        const lastChildren = allChildren[allChildren.length - 1]
        lastChildren.children.push({
          name,
          link,
        })
      }
      else {
        headingPos = parseInt(name.slice(0, 1))

        tree.children[headingPos].children.push({
          name,
          link,
        })
      }
    }
    else if (line.trim() !== "") {
      const name = line
      headingPos = parseInt(name.slice(0, 1))

      tree.children[headingPos].children.push({
        name,
        children: [],
      })
    }
  }

  return omitEmpty(tree)
}

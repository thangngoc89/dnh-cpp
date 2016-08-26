const omitEmpty = require("omit-empty")

let first = true

export default function processMd(data) {
  let headingPos = 0
  const linkRegex = /\[([^\]]+)\]\((.+)\)/

  const tree = {
    name: "Khóa học C++",
    toggled: true,
    level: 0,
    children: [],
  }
  const lines = data.split("\n")

  for (const lineId in lines) {

    const line = lines[lineId]
    // A heading
    if (line.startsWith("###")) {
      tree.children.push({
        name: line.substring(4, line.length),
        children: [],
        level: 1,
        ...(first && { toggled: true }),
      })
      first = false
    }
    // A link
    else if (linkRegex.test(line)) {
      const name = line.replace(linkRegex, "$1")
      const link = line.replace(linkRegex, "$2")

      const removeEverythingBeforeFirstSpace = (str) => (
        str.substring(str.indexOf(" "), str.length).trim()
      )
      if (name.trim().startsWith("*")) {
        const allChildren = tree.children[headingPos].children
        const lastChildren = allChildren[allChildren.length - 1]
        lastChildren.children.push({
          name: removeEverythingBeforeFirstSpace(name),
          level: 3,
          link: removeEverythingBeforeFirstSpace(link),
        })
      }
      else {
        headingPos = parseInt(name.slice(0, 1))

        tree.children[headingPos].children.push({
          name,
          level: 2,
          link,
        })
      }
    }
    else if (line.trim() !== "") {
      const name = line
      headingPos = parseInt(name.substring(0, name.indexOf(".")))

      tree.children[headingPos].children.push({
        name,
        level: 2,
        children: [],
      })
    }
  }

  return omitEmpty(tree)
}

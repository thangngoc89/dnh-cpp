/*
 * Get Github link for Markdown files
 */

export default function(filename, url) {
  let prefix
  let projectPath

  if (url === "/") {
    prefix = "cppcoban/blob/master"
    projectPath = "README.md"
  }

  if (url.startsWith("/cpp-co-ban/")) {
    prefix = "cppcoban/blob/master"
    projectPath = filename
      .split("/")
      .filter((item, i) => i !== 0) // remove first item
      .join("/")
  }

  return "https://github.com/daynhauhoc/" + prefix + "/" + projectPath
}

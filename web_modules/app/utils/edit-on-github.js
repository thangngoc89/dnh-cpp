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
    projectPath = url.split("/").slice(2, -1).join("/") + ".md"
  }

  return "https://github.com/daynhauhoc/" + prefix + "/" + projectPath
}

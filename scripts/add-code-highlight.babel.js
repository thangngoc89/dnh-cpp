import rehype from "rehype"
import highlight from "rehype-highlight"
import removeLangAuto from "./remove-lang-auto"

function addHighlight(html) {
  return rehype()
    .use(removeLangAuto)
    .use(highlight)
    .process(html)
    .toString()
}

export default ({ result }) => {
  return {
    ...result,
    body: addHighlight(result.body),
  }
}

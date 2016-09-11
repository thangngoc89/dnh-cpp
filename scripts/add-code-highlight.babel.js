import rehype from "rehype"
import highlight from "rehype-highlight"

function addHighlight(html) {
  html = html.replace(/<code class="lang-auto">/g, "<code>")
  return rehype().use(highlight).process(html).toString()
}

export default ({ result }) => {
  return {
    ...result,
    body: addHighlight(result.body),
  }
}

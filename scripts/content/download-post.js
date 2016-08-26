import got from "got"
import { resolve } from "path"
import fsp from "fs-promise"

export default function downloadPost(post) {
  const writeDir = resolve(__dirname, "../../content/", post.path)
  fsp.ensureDirSync(writeDir)

  return got("http://daynhauhoc.com/t/" + post.id + ".json")
  .then((res) => JSON.parse(res.body))
  .then((data) => data.post_stream.posts[0].cooked)
  .then((html) => `${ JSON.stringify({ title: post.name }) }
  ---
  ${html}
  `)
  .then((template) => fsp.writeJSON(resolve(writeDir, "index.md"), template))
}

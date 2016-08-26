import got from "got"
import { resolve } from "path"
import fsp from "fs-promise"
import simplifyUnicode from "vietnamese-unicode-toolkit"

export default function downloadPost(post) {
  const writeDir = resolve(__dirname, "../../content/generated")
  fsp.ensureDirSync(writeDir)

  return got("http://daynhauhoc.com/t/" + post.id + ".json")
  .then((res) => simplifyUnicode(res.body))
  .then((data) => JSON.parse(data))
  .then((data) => data.post_stream.posts[0].cooked)
  .then((html) => (
`---json
${ JSON.stringify({
  title: post.name,
  route: post.path,
}) }
---

${ html }
`
))
  .then((template) => fsp.writeFile(
    resolve(writeDir, post.id + ".md"),
    template
  ))
}

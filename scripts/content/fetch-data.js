import got from "got"
import processMd from "./parse-toc"
import generateSlug from "./generate-slug"
import downloadPost from "./download-post"
import simplifyUnicode from "vietnamese-unicode-toolkit"
import fsp from "fs-promise"
import { resolve } from "path"
import flatten from "tree-flatten"

got("http://daynhauhoc.com/raw/29429")
  .then((res) => simplifyUnicode(res.body))
  .then((data) => {
    // We don't want any part before this line
    const startPos = data.indexOf("### Giới thiệu tổng quan khóa học")

    data = data.substring(startPos, data.length)
    return processMd(data)
  })
  .then((data) => generateSlug(data))
  .then((data) => {

    const posts = flatten(data, "children")
      .filter((post) => post.hasOwnProperty("id"))

    return Promise.all([
      fsp.writeJson(
        resolve(__dirname, "../../content/toc.json"),
        data
      ),
      ...(posts.map((node) => downloadPost(node))),
    ])
  })
  .catch((error) => console.error(error))

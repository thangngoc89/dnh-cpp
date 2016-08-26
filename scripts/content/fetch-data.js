import got from "got"
import processMd from "./parse-toc"
import generateSlug from "./generate-slug"
import downloadPost from "./download-post"
import fsp from "fs-promise"
import { resolve } from "path"
import _ from "lodash"

got("http://daynhauhoc.com/raw/29429")
  .then((res) => {
    // We don't want any part before this line
    let data = res.body
    const startPos = data.indexOf("### Giới thiệu tổng quan khóa học")

    data = data.substring(startPos, data.length)
    return processMd(data)
  })
  .then((data) => generateSlug(data))
  .then((data) => {
    const postIds = _.chain(data.children)
      .flatMapDepth(obj => obj.hasOwnProperty("children") && obj.children, 2)
      .map(obj => (obj.hasOwnProperty("children") && obj.children) || obj)
      .flatMapDeep()
      .filter(obj => obj.hasOwnProperty("id"))
      .value()

    return Promise.all([
      fsp.writeJson(
        resolve(__dirname, "../../content/toc.json"),
        data
      ),
      ...(postIds.map((node) => downloadPost(node))),
    ])
  })
  .catch((error) => console.error(error))

import got from "got"
import processMd from "./parse-toc"

export default got("http://daynhauhoc.com/raw/29429")
  .then((res) => {
    // We don't want any part before this line
    let data = res.body
    const startPos = data.indexOf("### Giới thiệu tổng quan khóa học")

    data = data.substring(startPos, data.length)
    return processMd(data)
  })
  .catch((error) => console.error(error))

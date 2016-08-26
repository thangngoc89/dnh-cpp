import processMd, { getPostId } from "../parse-toc"
import fs from "fs"
import { resolve } from "path"

describe("parse toc", () => {
  it("parse correctly", () => {
    const file = fs.readFileSync(resolve(__dirname, "./data.txt"), "utf8")
    expect(processMd(file)).toMatchSnapshot()
  })

  it("simplify url", () => {
    // eslint-disable-next-line
    const from = "http://daynhauhoc.com/t/gioi-thieu-ve-series-tutorial-lap-trinh-c-danh-cho-nguoi-moi-bat-dau/29402"
    const to = 29402

    expect(getPostId(from)).toBe(to)
  })
})

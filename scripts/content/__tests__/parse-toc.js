import processMd from "../parse-toc"
import fs from "fs"
import { resolve } from "path"

describe("parse md", () => {
  it("parse correctly", () => {
    const file = fs.readFileSync(resolve(__dirname, "./data.txt"), "utf8")
    expect(processMd(file)).toMatchSnapshot()
  })
})

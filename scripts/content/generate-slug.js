import slug from "speakingurl"

const generateSlug = (name) => slug(name, { lang: "vn" })
export default function(data) {
  // lv0 is useless
  const lv1 = data.children

  for (const i in lv1) {
    if (lv1.hasOwnProperty(i)) {
      const node1 = lv1[i]
      if (node1.hasOwnProperty("children")) {
        for (const k in node1.children) {
          const lv2 = node1.children[k]
          const name2 = lv2.name

          if (lv2.hasOwnProperty("id")) {
            const slug = generateSlug(name2)
            lv2.path = slug.replace("-", "/") // replace first . with /
          }
          else if (lv2.hasOwnProperty("children")) {
            const lv3Prepend = name2
              .replace(/^(\d.\d).+/, "$1") // get "0.1" part
              .replace(".", "/")

            for (const j in lv2.children) {
              const lv3 = lv2.children[j]
              const name3 = generateSlug(lv3.name)
              lv3.path = lv3Prepend + "-" + name3
            }
          }
        }
      }
    }
  }

  return data
}

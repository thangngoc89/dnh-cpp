"use strict"

const run = require("./handler").run

run(null, null, (err, output) => {
  if (err) {
    throw new Error(err)
  }
  console.log(output)
})

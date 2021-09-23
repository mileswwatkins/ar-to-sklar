const fs = require("fs")
const https = require("https")

const dataUrl =
  "https://raw.githubusercontent.com/stdlib-js/datasets-cmudict/main/data/dict.json"

let data = ""
const req = https.get(dataUrl, (res) => {
  res.on("data", (d) => {
    data += d
  })

  res.on("end", () => {
    const jsonified = JSON.parse(data)

    const rhymesOnly = Object.fromEntries(
      Object.entries(jsonified).filter(
        ([word, pronunciation]) =>
          pronunciation.includes("AA1 R") || pronunciation.includes("AA2 R")
      )
    )

    fs.writeFileSync("rhymes-with-sklar.json", JSON.stringify(rhymesOnly))
  })
})

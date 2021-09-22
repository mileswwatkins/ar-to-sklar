function walk(node, cmuDict) {
  let child
  let next

  const tagName = node.tagName ? node.tagName.toLowerCase() : ""
  if (tagName === "input" || tagName === "textarea") {
    return
  }

  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild
      while (child) {
        next = child.nextSibling
        walk(child, cmuDict)
        child = next
      }
      break

    case 3: // Text node
      handleText(node, cmuDict)
      break
  }
}

function handleText(textNode, cmuDict) {
  let text = textNode.nodeValue
  const chunks = text.split(/\b/)

  const replacedChunks = chunks.map((chunk) => {
    if (!(chunk.includes("r") || chunk.includes("R"))) {
      return chunk
    }

    const pronunciation = cmuDict[chunk.toUpperCase()]
    if (typeof pronunciation === "undefined") {
      return chunk
    }

    const isRhyme =
      pronunciation.includes("AA1 R") || pronunciation.includes("AA2 R")
    const isFollowedBySilentE =
      (pronunciation.endsWith("AA1 R") || pronunciation.endsWith("AA2 R")) &&
      chunk.endsWith("e")
    if (isRhyme) {
      let replacedChunk
      if (!isFollowedBySilentE) {
        replacedChunk = chunk
          .toLowerCase()
          .replace(/[bcdfghjklmnpqrstvwxz]*a+r+/g, "sklar")
      } else {
        replacedChunk = chunk
          .toLowerCase()
          .replace(/[bcdfghjklmnpqrstvwxz]*a+r+e?/g, "sklar")
      }

      const wasCapitalized = chunk.charAt(0) === chunk.charAt(0).toUpperCase()
      if (wasCapitalized) {
        replacedChunk =
          replacedChunk.charAt(0).toUpperCase() + replacedChunk.slice(1)
      }

      return replacedChunk
    } else {
      return chunk
    }
  })

  textNode.nodeValue = replacedChunks.join("")
}

const url = chrome.runtime.getURL("cmudict.json")
fetch(url)
  .then((response) => response.json())
  .then((cmuDict) => {
    walk(document.body, cmuDict)
    document.addEventListener(
      "DOMNodeInserted",
      function (e) {
        walk(document.body)
      },
      false
    )
  })

function walk(node, rhymes) {
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
        walk(child, rhymes)
        child = next
      }
      break

    case 3: // Text node
      handleText(node, rhymes)
      break
  }
}

function handleText(textNode, rhymes) {
  let text = textNode.nodeValue
  const chunks = text.split(/\b/)

  const replacedChunks = chunks.map((chunk) => {
    const pronunciation = rhymes[chunk.toUpperCase()]

    if (typeof pronunciation === "undefined") {
      return chunk
    }

    let replacedChunk

    const endsWithSilentE =
      (pronunciation.endsWith("AA1 R") || pronunciation.endsWith("AA2 R")) &&
      chunk.endsWith("e")
    // TO DO: Make regular expressions more precise, to handle:
    // - words like `Denmark` that currently turn to `Desklark`
    // - words like `hardware` that currently turn to `sklarsklare`
    if (!endsWithSilentE) {
      replacedChunk = chunk
        .toLowerCase()
        .replace(/[bcdfghjklmnpqrstvwxz]*a+r+/g, "sklar")
    } else {
      replacedChunk = chunk
        .toLowerCase()
        .replace(/[bcdfghjklmnpqrstvwxz]*a+r+e/g, "sklar")
    }

    const wasOriginallyCapitalized = chunk.charAt(0) === chunk.charAt(0).toUpperCase()
    if (wasOriginallyCapitalized) {
      replacedChunk =
        replacedChunk.charAt(0).toUpperCase() + replacedChunk.slice(1)
    }

    return replacedChunk
  })

  textNode.nodeValue = replacedChunks.join("")
}

const url = chrome.runtime.getURL("rhymes-with-sklar.json")
fetch(url)
  .then((response) => response.json())
  .then((rhymes) => {
    walk(document.body, rhymes)
    document.addEventListener(
      "DOMNodeInserted",
      function (e) {
        walk(document.body)
      },
      false
    )
  })

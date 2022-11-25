const fs = require('fs')
const { exit, argv } = require('process')

const readFile = () => {
  const inputFile = argv[3] || "input.txt"

  const buffer = fs.readFileSync(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      exit(1)
    }
  })
  return buffer
}

const parseContent = (content) => {
  const lines = content.split('\n')
  let pageIdx = 0
  let parsed = []

  lines.map(tmp => {
    const line = tmp.trim()

    if (line === '') return

    if ((/^page\s+[0-9]+/gi).test(line)) {
      const splitted = line.split(' ')
      pageIdx = Number(splitted[splitted.length - 1])
    }

    let page = parsed.find(e => e.page === pageIdx)

    if (!page) {
      parsed = [...parsed, {page: pageIdx, lines: []}]
      page = parsed.find(e => e.page === pageIdx)
    }
    page.lines.push(line)
  })

  return parsed
}

(() => {
  const fileContent = readFile()
  let output = ''
  const parsed = parseContent(fileContent)

  const formatted = parsed.map(page => {
    return page.lines.map((line, idx) => {
      if (idx === 0) return ''
      return `${page.page}.${line}`
    })
  })

  formatted.forEach(page => {
    output += page.join('\n')
  })

  fs.writeFileSync(`output-${+ new Date()}.txt`, output)

})()
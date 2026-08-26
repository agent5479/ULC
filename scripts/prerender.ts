/**
 * Post-build: inject static JSON-LD and prerendered React HTML into dist/index.html
 * so AI crawlers and non-JS agents see content without executing JavaScript.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
import App from '../src/App'
import { getJsonLdScriptHtml } from '../src/seo/schema'

const distIndex = resolve(import.meta.dirname, '../dist/index.html')
let html = readFileSync(distIndex, 'utf8')

const appHtml = renderToString(createElement(App))
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

const jsonLd = getJsonLdScriptHtml()
if (!html.includes('application/ld+json')) {
  html = html.replace('</head>', `    ${jsonLd}\n  </head>`)
}

writeFileSync(distIndex, html)
console.log('Prerendered / into dist/index.html')

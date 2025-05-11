#!/usr/bin/env node

/**
 * Script to convert JSON translation files to TypeScript/JavaScript
 * with wrapped translation functions while preserving original structure
 *
 * Usage:
 *   node generateTranslations.ts [options]
 *
 * Options:
 *   --output <path>    Output file path (default: src/curd_translations.ts)
 *   --wrapper <func>   Function to wrap translations (default: $gettext)
 *   --help             Show this help message
 */

import fs from 'node:fs'
import path from 'node:path'
// Import translations directly
import translations from '../src/locales/en-US.json' with { type: 'json' }

// Parse command line arguments
const args = process.argv.slice(2)
function getArg(flag: string, defaultValue: string): string {
  const index = args.indexOf(flag)
  if (index === -1)
    return defaultValue
  return args[index + 1] || defaultValue
}

const hasFlag = (flag: string): boolean => args.includes(flag)

// Show help if requested
if (hasFlag('--help')) {
  // eslint-disable-next-line no-console
  console.log(`
  Generate TypeScript/JavaScript translations from en-US.json while preserving hierarchy
  
  Usage:
    node generateTranslations.ts [options]
  
  Options:
    --output <path>    Output file path (default: src/curd_translations.ts)
    --wrapper <func>   Function to wrap translations (default: $gettext)
    --help             Show this help message
  
  Examples:
    node generateTranslations.ts
    node generateTranslations.ts --output src/i18n/translations.ts
    node generateTranslations.ts --wrapper "t" --output src/locale.js
    
  Output format:
    The script preserves the original JSON structure:
    
    export const translations = {
      key1: $gettext('value1'),
      key2: $gettext('value2'),
      nestedKey: {
        subKey1: $gettext('subValue1')
      }
    }
  `)
  process.exit(0)
}

// Get configuration from arguments
const outputPath = getArg('--output', 'src/curd_translations.ts')
const wrapperFn = getArg('--wrapper', '$gettext')
const outputFile = path.resolve(process.cwd(), outputPath)

// Create output directory if it doesn't exist
const outputDir = path.dirname(outputFile)
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Define types for translation objects
type TranslationValue = string | Record<string, any>
type TranslationObject = Record<string, TranslationValue>

try {
  // Recursively process translations object and preserve the hierarchy
  function processTranslations(obj: TranslationObject, indent = 0): string {
    let result = '{\n'
    const spaces = ' '.repeat(indent + 2)
    const closingSpaces = ' '.repeat(indent)

    const entries = Object.entries(obj)
    entries.forEach(([key, value], index) => {
      // Convert key to a valid JS property name if needed
      const sanitizedKey = /^[a-z_$][\w$]*$/i.test(key)
        ? key
        : `'${key.replace(/'/g, '\\\'')}'`

      const isLast = index === entries.length - 1

      if (typeof value === 'object' && value !== null) {
        result += `${spaces}${sanitizedKey}: ${processTranslations(value as TranslationObject, indent + 2)}`
        result += isLast ? '\n' : ',\n'
      }
      else {
        // Escape single quotes in the translation string
        const escapedValue = String(value).replace(/'/g, '\\\'')
        result += `${spaces}${sanitizedKey}: ${wrapperFn}('${escapedValue}')`
        result += isLast ? '\n' : ',\n'
      }
    })

    result += `${closingSpaces}}`
    return result
  }

  // Generate the typescript/javascript content
  const fileContent = `/* eslint-disable */
// This file is auto-generated. Do not edit manually.

export const translations = ${processTranslations(translations)}
`

  // Write to the output file
  fs.writeFileSync(outputFile, fileContent, 'utf8')
  // eslint-disable-next-line no-console
  console.log(`Translations successfully exported to ${outputFile}`)
}
catch (error) {
  console.error('Error generating translations file:', error)
  process.exit(1)
}

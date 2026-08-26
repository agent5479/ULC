/** Print enquiry catalog — prices optional for a later pricelist drop-in. */

export type CatalogOption = {
  id: string
  label: string
  /** Reserved for future pricelist */
  unitPrice?: number
}

export const JOB_TYPES: CatalogOption[] = [
  { id: 'copies', label: 'Everyday copies / documents' },
  { id: 'business-cards', label: 'Business cards' },
  { id: 'posters', label: 'Posters' },
  { id: 'photo', label: 'Higher-quality / photo prints' },
]

export const PAPERS: CatalogOption[] = [
  { id: 'plain', label: 'Plain' },
  { id: 'recycled', label: 'Recycled' },
  { id: 'gloss', label: 'Photo / gloss' },
  { id: 'card', label: 'Card stock' },
]

export const SIZES: CatalogOption[] = [
  { id: 'a4', label: 'A4' },
  { id: 'a3', label: 'A3' },
  { id: 'sra3', label: 'SRA3' },
  { id: 'business-card', label: 'Business card' },
  { id: 'custom', label: 'Custom / other' },
]

export const COLOURS: CatalogOption[] = [
  { id: 'bw', label: 'Black & white' },
  { id: 'colour', label: 'Colour' },
]

export const SIDES: CatalogOption[] = [
  { id: 'single', label: 'Single-sided' },
  { id: 'double', label: 'Double-sided' },
]

export const FINISHING: CatalogOption[] = [
  { id: 'laminate', label: 'Laminating' },
  { id: 'bind', label: 'Binding' },
  { id: 'staple', label: 'Stapling' },
  { id: 'fold', label: 'Folding' },
  { id: 'trim', label: 'Trim' },
]

export type PrintSelection = {
  jobType: string
  paper: string
  size: string
  colour: string
  sides: string
  finishing: string[]
  quantity: number
  notes: string
}

export const DEFAULT_SELECTION: PrintSelection = {
  jobType: 'copies',
  paper: 'plain',
  size: 'a4',
  colour: 'bw',
  sides: 'single',
  finishing: [],
  quantity: 1,
  notes: '',
}

/** Sensible defaults when switching job type (user can still override). */
export function defaultsForJobType(jobType: string): Partial<PrintSelection> {
  switch (jobType) {
    case 'business-cards':
      return { paper: 'card', size: 'business-card', colour: 'colour', sides: 'double' }
    case 'posters':
      return { paper: 'gloss', size: 'a3', colour: 'colour', sides: 'single' }
    case 'photo':
      return { paper: 'gloss', size: 'a4', colour: 'colour', sides: 'single' }
    default:
      return { paper: 'plain', size: 'a4', colour: 'bw', sides: 'single' }
  }
}

function labelOf(options: CatalogOption[], id: string): string {
  return options.find((o) => o.id === id)?.label ?? id
}

export function formatPrintBrief(selection: PrintSelection): string {
  const finish =
    selection.finishing.length > 0
      ? selection.finishing.map((id) => labelOf(FINISHING, id)).join(', ')
      : 'None'

  const lines = [
    'Print enquiry (from website selector):',
    `• Job: ${labelOf(JOB_TYPES, selection.jobType)}`,
    `• Paper: ${labelOf(PAPERS, selection.paper)}`,
    `• Size: ${labelOf(SIZES, selection.size)}`,
    `• Print: ${labelOf(COLOURS, selection.colour)}, ${labelOf(SIDES, selection.sides)}`,
    `• Finishing: ${finish}`,
    `• Quantity: ${selection.quantity}`,
  ]

  if (selection.notes.trim()) {
    lines.push(`• Notes: ${selection.notes.trim()}`)
  }

  lines.push('', '(Please attach artwork / files if you have them.)')
  return lines.join('\n')
}

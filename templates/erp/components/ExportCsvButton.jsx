import { Download } from 'lucide-react'

/**
 * Serialises an array of plain objects to a CSV file and triggers a download.
 * Handles values that contain commas or double-quotes.
 */
function exportToCsv(data, filename = 'export.csv') {
  if (!data || !data.length) return
  const headers = Object.keys(data[0])
  const escape = (val) => {
    const str = val == null ? '' : String(val)
    return str.includes(',') || str.includes('"') || str.includes('\n')
      ? `"${str.replace(/"/g, '""')}"`
      : str
  }
  const rows = data.map((row) => headers.map((h) => escape(row[h])).join(','))
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * A small "Export CSV" button intended to sit next to a "View All" link
 * inside a card header.
 *
 * Usage:
 *   <ExportCsvButton data={recentOrders} filename="recent-orders.csv" />
 *
 * Props:
 *   data      {Object[]}  — array of row objects to export
 *   filename  {string}    — downloaded file name (default: "orders.csv")
 *   className {string}    — optional extra Tailwind classes
 */
export function ExportCsvButton({ data = [], filename = 'orders.csv', className = '' }) {
  return (
    <button
      type="button"
      onClick={() => exportToCsv(data, filename)}
      className={[
        'inline-flex items-center gap-1.5',
        'px-2.5 py-1 rounded-md',
        'text-xs font-medium',
        'border border-border',
        'text-muted-foreground hover:text-foreground hover:bg-muted',
        'transition-colors',
        className,
      ].join(' ')}
      title="Export orders to CSV"
    >
      <Download className="w-3.5 h-3.5 shrink-0" />
      Export CSV
    </button>
  )
}
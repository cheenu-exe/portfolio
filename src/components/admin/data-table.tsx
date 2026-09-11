import { ReactNode } from "react"

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  actions?: (item: T) => ReactNode
  emptyMessage?: string
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  actions,
  emptyMessage = "No items found.",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200 p-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {data.map((item, i) => (
            <tr
              key={item.id ?? i}
              className="bg-white transition-colors hover:bg-neutral-50 dark:bg-neutral-950 dark:hover:bg-neutral-900"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3 text-right">{actions(item)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

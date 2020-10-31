export default function ChartLegend({
  issue,
  className = '',
}) {
  return (
    <div className={`flex ${className}`}>
      <div style={{ backgroundColor: issue.color }} className="rounded-full w-4 h-4"></div>
      <div className="flex-1 -mt-0.5 px-4 text-sm leading-5 truncate">
        <a href={issue.html_url} target="_blank" className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150" title={issue.title}>{issue.title}</a>
      </div>
    </div>
  )
}
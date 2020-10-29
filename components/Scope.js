import Toggle from './Toggle'

export default function Scope({
  issue,
  toggled = true,
  className = '',
  onChange = () => {},
}) {
  return (
    <div className={`flex shadow-sm rounded-md ${className}`}>
      <div style={{ backgroundColor: issue.color }} className="flex-shrink-0 flex items-center justify-center w-8 text-white text-sm leading-5 font-medium rounded-l-md"></div>
      <div className="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
          <a href={issue.html_url} target="_blank" className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150" title={issue.title}>{issue.title}</a>
        </div>
        <div className="flex-shrink-0 pr-2">
          <Toggle toggled={toggled} onChange={(toggled) => onChange({issue, toggled})} className="mt-1" />
        </div>
      </div>
    </div>
  )
}
import Toggle from './Toggle'

export default function Bet({
  issue,
  toggled = false,
  className = '',
  onChange = () => {},
}) {
  const appetite = issue.labels.find(label => label.name.startsWith('Appetite:')).name.substr(10)
  return (
    <div className={`flex shadow-sm rounded-md ${className}`}>
      <div className="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
          <a href={issue.html_url} target="_blank" className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150" title={issue.title}>{issue.title}</a>
          <p className="text-gray-500">{appetite}</p>
        </div>
        <div className="flex-shrink-0 pr-2">
          <Toggle toggled={toggled} onChange={(toggled) => onChange({issue, toggled})} />
        </div>
      </div>
    </div>
  )
}
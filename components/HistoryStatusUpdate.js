import ReactMarkdown from 'react-markdown'
import GithubFlavoredMarkdown from 'remark-gfm'
import RemarkEmoji from 'remark-emoji'

export default function HistoryStatusUpdate ({ statusUpdate, className = '' }) {
  function fullDateTime() {
    const date = new Date(statusUpdate.progress.createdAt).toDateString()
    const time = new Date(statusUpdate.progress.createdAt).toLocaleTimeString()
    if (statusUpdate.progress.createdAt !== statusUpdate.progress.updatedAt) {
      const updateDate = new Date(statusUpdate.progress.updatedAt).toDateString()
      const updateTime = new Date(statusUpdate.progress.updatedAt).toLocaleTimeString()
      return `${date} ${time} (last edited at ${updateDate} ${updateTime})`
    }
    return `${date} ${time}`
  }
  
  function lastDate() {
    if (statusUpdate.progress.createdAt !== statusUpdate.progress.updatedAt) {
      return new Date(statusUpdate.progress.updatedAt).toDateString()
    }
    return new Date(statusUpdate.progress.createdAt).toDateString()
  }

  function colorOfPercentage() {
    if (statusUpdate.progress.percentage < 30) return 'text-red-500'
    if (statusUpdate.progress.percentage < 60) return 'text-yellow-400'
    return 'text-green-500'
  }

  const mark = '```\nconst a = 0;\n````\n'

  return (
    <div className={`${className}`}>
      <div className="flex">
        <img className="inline-block h-10 w-10 rounded-md" src={statusUpdate.progress.author.avatarUrl} title={statusUpdate.progress.author.name} />
        <div className="ml-2 -mt-1">
          <a href={statusUpdate.progress.author.url} target="_blank" className="text-sm text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">{statusUpdate.progress.author.name}</a>
          <div className="text-sm text-gray-500">
            Updated progress of
            <a href={statusUpdate.progress.url} target="_blank" className="inline-flex mx-1.5 text-sm text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">
              <div style={{ backgroundColor: statusUpdate.scope.color }} className="mr-1 rounded-full w-3 h-3"></div>
              <div className="-mt-1">{statusUpdate.scope.title}</div>
            </a>
            to <span className={colorOfPercentage()}>{statusUpdate.progress.percentage}% {statusUpdate.progress.percentage === 100 && '✨'}</span> on&nbsp;
            <span title={fullDateTime()}>
              {lastDate()}
            </span>
          </div>
        </div>
      </div>
      <ReactMarkdown plugins={[GithubFlavoredMarkdown, RemarkEmoji]} className="mt-4 mb-8 prose prose-pink">
        {statusUpdate.progress.statusMarkdown}
      </ReactMarkdown>
    </div>
  )
}
import HillChart from './HillChart'
import ChartLegend from './ChartLegend'
import HistoryStatusUpdate from './HistoryStatusUpdate'

export default function CycleDetails({ selectedScopes, history }) {
  return (
    <>
      <HillChart scopes={selectedScopes} />
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {
          (selectedScopes || []).map((scope, index) => (
            <ChartLegend key={index} issue={scope} className="mt-3" />
          ))
        }
      </div>
      <h3 className="mt-12 mb-8 text-xl leading-6 font-medium text-gray-900">
        History
      </h3>
      <div>
        {
          history.map((statusUpdate, index) => (
            <HistoryStatusUpdate key={index} statusUpdate={statusUpdate} className="mt-4" />
          ))
        }
        {
          !history.length && (
            <p className="italic text-sm text-gray-400 mt-4">No history yet.</p>
          )
        }
      </div>
    </>
  )
}
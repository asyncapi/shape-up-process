import Link from 'next/link'

export default function CycleHeader({ visibleCycle, inCycle, isPastCycle, previousCycle, nextCycle }) {
  return (
    <>
      <div className="flex">
        <h2 className="flex-1 text-2xl leading-6 font-medium text-gray-900">
          {inCycle ? 'Current' : 'This'} cycle
        </h2>
        <div className="flex">
          <Link href={previousCycle ? `/cycles/${previousCycle.id}` : ''}>
            <a title="Go to the previous cycle">
              <svg className={`w-6 h-6 ${!previousCycle && 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </a>
          </Link>

          <Link href={nextCycle ? `/cycles/${nextCycle.id}` : ''}>
            <a title="Go to the next cycle">
              <svg className={`w-6 h-6 ${!nextCycle && 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
      <p className="my-4 text-gray-500">{inCycle ? 'The current' : 'This'} cycle {inCycle ? 'started' : 'starts'} on {new Date(visibleCycle.start_date).toDateString()} and will finish on {new Date(visibleCycle.due_on).toDateString()}.</p>

      {
        !inCycle && (
          <div className="rounded-md bg-yellow-50 shadow-xs p-4 my-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm leading-5 font-medium text-yellow-800">
                  Attention
                </h3>
                <div className="mt-2 text-sm leading-5 text-yellow-700">
                  <p>
                    {
                      isPastCycle ? (
                        <span>
                          This cycle has already finished.
                          <Link href="/"><a className="inline-flex mx-1.5 text-sm text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">Go to the current cycle.</a></Link>
                        </span>
                      ) : <span>This cycle hasn't started yet. We're currently evaluating the pitches below and will soon decide which ones will make it to the cycle. Stay tuned!</span>
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
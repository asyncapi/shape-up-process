export default function Pitches({ pitches = [] }) {
  function appetite(pitch) {
    const appetiteLabel = pitch.labels.find(label => label.name.startsWith('Appetite:'))
    if (!appetiteLabel) return null

    return appetiteLabel.name.substr(10)
  }

  return (
    <div>
      <ul className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {
          !pitches.length && (
            <p className="italic text-sm text-gray-400 mt-4">No pitches have been suggested yet.</p>
          )
        }
        {
          pitches.map((pitch, index) => (
            <li key={index} className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
              <a href={pitch.html_url} target="_blank" className="flex-1 flex flex-col p-8 bg-cover rounded-tl-lg rounded-tr-lg" style={{ backgroundImage: `url('/img/backgrounds/${index % 9 + 1}.webp')` }}>
                <span className="mt-6 text-gray-900 text-2xl leading-normal font-medium">{pitch.title}</span>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Appetite</dt>
                  <dd className="mt-3">
                    <span className="px-2 py-1 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">{appetite(pitch)}</span>
                  </dd>
                  <dt className="sr-only">Author avatar</dt>
                  <dd className="text-gray-700 text-sm leading-5 mt-6 mb-1">
                    <img className="inline w-10 h-10 shadow border-2 border-gray-600 bg-gray-300 rounded-full" src={pitch.user.avatar_url} title={pitch.user.login}></img>
                  </dd>
                  <dt className="sr-only">Author</dt>
                  <dd className="sr-only">{pitch.user.login}</dd>
                </dl>
              </a>
              <div className="border-t border-gray-200">
                <div className="-mt-px flex">
                  <div className="w-0 flex-1 flex">
                    <a href={pitch.html_url} target="_blank" className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul>

    </div>
  )
}
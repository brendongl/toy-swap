import { useState, useCallback } from 'react'
import { useStore } from '../store'
import { useShallow } from 'zustand/shallow'

const conditionLabels: Record<string, string> = { 
  like_new: 'Like New ✨', 
  good: 'Good 👍', 
  fair: 'Fair 👌', 
  well_loved: 'Well Loved 💕' 
}

function ToyCard({ toy, onSwipe }: { toy: any; onSwipe: (dir: 'left'|'right') => void }) {
  const owner = useStore(s => s.getUser(toy.user_id))
  const [showDetail, setShowDetail] = useState(false)

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <img 
          src={toy.photos[0]} 
          alt={toy.title} 
          className="w-full h-64 object-cover cursor-pointer"
          loading="lazy"
          onClick={() => setShowDetail(true)}
          onError={(e) => {
            // Fallback to a solid color if image fails
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkYyRDU1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iNDAiPvCfp6E8L3RleHQ+Cjwvc3ZnPgo='
          }}
        />
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800 truncate flex-1">{toy.title}</h3>
            <span className="text-xs px-3 py-1 bg-[#FFF0F3] text-[#FF2D55] rounded-full font-medium ml-2 whitespace-nowrap">
              {conditionLabels[toy.condition]}
            </span>
          </div>
          
          <p className="text-gray-400 text-sm mb-3">
            📏 Age: {toy.age_range} • 🏷️ {toy.brand || 'No brand'}
          </p>
          
          {owner && (
            <div className="flex items-center gap-2 mb-4">
              <img src={owner.profile_photo_url} className="w-8 h-8 rounded-full object-cover" alt="" />
              <span className="text-sm text-gray-600">{owner.name}</span>
              <span className="text-sm text-yellow-500">{'⭐'.repeat(Math.round(owner.trust_score))}</span>
              <span className="text-xs text-gray-400 ml-auto">📍 {owner.district}</span>
            </div>
          )}
          
          <div className="flex gap-3">
            <button 
              onClick={() => onSwipe('left')}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold active:scale-95 transition-transform"
            >
              Pass ❌
            </button>
            <button 
              onClick={() => onSwipe('right')}
              className="flex-1 py-3 bg-[#FF2D55] text-white rounded-xl font-semibold active:scale-95 transition-transform"
            >
              Want ❤️
            </button>
          </div>
        </div>
      </div>

      {/* Simple modal */}
      {showDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowDetail(false)}>
          <div className="bg-white rounded-3xl w-full max-w-sm max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <img src={toy.photos[0]} className="w-full h-48 object-cover" alt="" />
            {toy.photos.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {toy.photos.map((p: string, i: number) => (
                  <img key={i} src={p} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" alt="" />
                ))}
              </div>
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{toy.title}</h2>
              <div className="flex gap-2 mb-3">
                <span className="text-sm px-3 py-1 bg-[#FFF0F3] text-[#FF2D55] rounded-full">{conditionLabels[toy.condition]}</span>
                <span className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{toy.age_range}</span>
              </div>
              <p className="text-gray-600 mb-4">{toy.description}</p>
              {owner && (
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 mb-4">
                  <img src={owner.profile_photo_url} className="w-12 h-12 rounded-full object-cover" alt="" />
                  <div>
                    <p className="font-semibold">{owner.name}</p>
                    <p className="text-sm text-gray-500">📍 {owner.district} • {'⭐'.repeat(Math.round(owner.trust_score))} • {owner.swaps_completed} swaps</p>
                  </div>
                </div>
              )}
              <button 
                onClick={() => setShowDetail(false)}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function Browse() {
  const toys = useStore(useShallow(s => s.getBrowseToys()))
  const addSwipe = useStore(s => s.addSwipe)
  const [matchPopup, setMatchPopup] = useState<string | null>(null)
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set())

  const visibleToys = toys.filter(t => !removedIds.has(t.id))
  const currentToy = visibleToys[0]

  const handleSwipe = useCallback((dir: 'left' | 'right') => {
    if (!currentToy) return
    const match = addSwipe(currentToy.id, currentToy.user_id, dir)
    if (match) {
      setMatchPopup(currentToy.user_id)
      setTimeout(() => setMatchPopup(null), 3000)
    }
    setRemovedIds(prev => new Set(prev).add(currentToy.id))
  }, [currentToy, addSwipe])

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">ToySwap 🧸</h1>
        <span className="text-sm text-gray-400">{visibleToys.length} toys nearby</span>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {visibleToys.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No more toys to browse!</h2>
            <p className="text-gray-400">Check back later for new listings</p>
          </div>
        ) : (
          <ToyCard toy={currentToy} onSwipe={handleSwipe} />
        )}
      </div>

      {/* Simple match popup */}
      {matchPopup && (
        <div className="fixed inset-0 z-50 bg-[#FF2D55]/90 flex flex-col items-center justify-center text-white" onClick={() => setMatchPopup(null)}>
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold mb-2">It's a Match!</h2>
          <p className="text-xl opacity-80 mb-6">You both like each other's toys!</p>
          <p className="opacity-60">Tap anywhere to continue</p>
        </div>
      )}
    </div>
  )
}
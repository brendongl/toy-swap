import { useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useStore } from '../store'

const conditionLabels: Record<string, string> = { like_new: 'Like New ✨', good: 'Good 👍', fair: 'Fair 👌', well_loved: 'Well Loved 💕' }

function ToyCard({ toy, onSwipe, style }: { toy: any; onSwipe: (dir: 'left'|'right') => void; style?: any }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0])
  const owner = useStore(s => s.getUser(toy.user_id))
  const [showDetail, setShowDetail] = useState(false)

  return (
    <>
      <motion.div
        className="absolute inset-4 top-2 bottom-24 cursor-grab active:cursor-grabbing"
        style={{ x, rotate, ...style }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 100) {
            onSwipe(info.offset.x > 0 ? 'right' : 'left')
          }
        }}
        whileDrag={{ scale: 1.02 }}
        exit={{ x: 500, opacity: 0, transition: { duration: 0.3 } }}
      >
        <div className="bg-white rounded-3xl shadow-xl h-full overflow-hidden relative" onClick={() => setShowDetail(true)}>
          <img src={toy.photos[0]} alt={toy.title} className="w-full h-3/5 object-cover" loading="lazy" />
          <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-6 bg-green-500 text-white px-6 py-2 rounded-xl text-2xl font-bold -rotate-12 border-4 border-white">WANT ❤️</motion.div>
          <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-6 bg-red-500 text-white px-6 py-2 rounded-xl text-2xl font-bold rotate-12 border-4 border-white">PASS ❌</motion.div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-800 truncate flex-1">{toy.title}</h3>
              <span className="text-xs px-3 py-1 bg-[#FFF0F3] text-[#FF2D55] rounded-full font-medium ml-2 whitespace-nowrap">{conditionLabels[toy.condition]}</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">📏 Age: {toy.age_range} • 🏷️ {toy.brand || 'No brand'}</p>
            {owner && (
              <div className="flex items-center gap-2">
                <img src={owner.profile_photo_url} className="w-8 h-8 rounded-full object-cover" alt="" />
                <span className="text-sm text-gray-600">{owner.name}</span>
                <span className="text-sm text-yellow-500">{'⭐'.repeat(Math.round(owner.trust_score))}</span>
                <span className="text-xs text-gray-400 ml-auto">📍 {owner.district}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {showDetail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setShowDetail(false)}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }} className="bg-white rounded-t-3xl w-full max-w-md mx-auto max-h-[85vh] overflow-auto" onClick={e => e.stopPropagation()}>
              <div className="p-1 flex justify-center"><div className="w-10 h-1 bg-gray-300 rounded-full" /></div>
              <img src={toy.photos[0]} className="w-full h-64 object-cover" alt="" />
              {toy.photos.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {toy.photos.map((p: string, i: number) => <img key={i} src={p} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" alt="" />)}
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-1">{toy.title}</h2>
                <div className="flex gap-2 mb-3">
                  <span className="text-sm px-3 py-1 bg-[#FFF0F3] text-[#FF2D55] rounded-full">{conditionLabels[toy.condition]}</span>
                  <span className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{toy.age_range}</span>
                </div>
                <p className="text-gray-600 mb-4">{toy.description}</p>
                {owner && (
                  <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                    <img src={owner.profile_photo_url} className="w-12 h-12 rounded-full object-cover" alt="" />
                    <div>
                      <p className="font-semibold">{owner.name}</p>
                      <p className="text-sm text-gray-500">📍 {owner.district} • {'⭐'.repeat(Math.round(owner.trust_score))} • {owner.swaps_completed} swaps</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Browse() {
  const toys = useStore(s => s.getBrowseToys())
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
    <div className="h-full flex flex-col relative">
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">ToySwap 🧸</h1>
        <span className="text-sm text-gray-400">{visibleToys.length} toys nearby</span>
      </div>

      <div className="flex-1 relative">
        {visibleToys.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No more toys to browse!</h2>
            <p className="text-gray-400">Check back later for new listings</p>
          </div>
        ) : (
          <AnimatePresence>
            {visibleToys.slice(0, 2).reverse().map((toy, i) => (
              <ToyCard key={toy.id} toy={toy} onSwipe={handleSwipe} style={i === 0 ? { scale: 0.95, y: -10 } : {}} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {currentToy && (
        <div className="flex justify-center gap-6 py-4 px-6">
          <button onClick={() => handleSwipe('left')} className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl active:scale-90 transition-transform border border-gray-100">❌</button>
          <button onClick={() => handleSwipe('right')} className="w-16 h-16 bg-[#FF2D55] rounded-full shadow-lg flex items-center justify-center text-2xl active:scale-90 transition-transform">❤️</button>
        </div>
      )}

      {/* Match celebration */}
      <AnimatePresence>
        {matchPopup && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="fixed inset-0 z-50 bg-[#FF2D55]/90 flex flex-col items-center justify-center text-white" onClick={() => setMatchPopup(null)}>
            <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ repeat: 2, duration: 0.5 }}>
              <span className="text-8xl">🎉</span>
            </motion.div>
            <h2 className="text-4xl font-bold mt-6 mb-2">It's a Match!</h2>
            <p className="text-xl opacity-80">You both like each other's toys!</p>
            <p className="mt-6 opacity-60">Tap anywhere to continue</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store'
import { useShallow } from 'zustand/shallow'


export default function MatchDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const user = useStore(s => s.currentUser)
  const match = useStore(s => s.matches.find(m => m.id === id))
  const partner = useStore(s => match ? s.getMatchPartner(match) : undefined)
  const myToys = useStore(useShallow(s => s.getUserToys(user?.id || '')))
  const partnerToys = useStore(useShallow(s => s.getUserToys(partner?.id || '')))
  const proposals = useStore(useShallow(s => s.getMatchProposals(id || '')))
  const { createProposal, respondToProposal } = useStore()
  const [showPropose, setShowPropose] = useState(false)
  const [myToyId, setMyToyId] = useState('')
  const [theirToyId, setTheirToyId] = useState('')

  // Move hooks BEFORE conditional return (rules of hooks)
  const swipes = useStore(useShallow(s => s.swipes))
  const theirLikes = useMemo(() => {
    if (!partner || !user) return []
    return swipes.filter(sw => sw.swiper_id === partner.id && sw.toy_owner_id === user.id && sw.direction === 'right')
  }, [swipes, partner, user])
  const ourLikes = useMemo(() => {
    if (!partner || !user) return []
    return swipes.filter(sw => sw.swiper_id === user.id && sw.toy_owner_id === partner.id && sw.direction === 'right')
  }, [swipes, partner, user])

  if (!match || !partner || !user) return <div className="p-6">Match not found</div>

  const handlePropose = () => {
    if (myToyId && theirToyId) {
      createProposal(match.id, myToyId, theirToyId)
      setShowPropose(false)
    }
  }

  return (
    <div className="px-6 pt-4">
      <button onClick={() => nav('/matches')} className="text-[#FF2D55] text-lg mb-4">← Back</button>

      <div className="flex items-center gap-4 mb-6">
        <img src={partner.profile_photo_url} className="w-16 h-16 rounded-full object-cover" alt="" />
        <div>
          <h1 className="text-xl font-bold">{partner.name}</h1>
          <p className="text-sm text-gray-500">{'⭐'.repeat(Math.round(partner.trust_score))} • 📍 {partner.district}</p>
        </div>
        <button onClick={() => nav(`/chat/${match.id}`)} className="ml-auto bg-[#FF2D55] text-white px-4 py-2 rounded-xl text-sm font-medium active:scale-95 transition-transform">💬 Chat</button>
      </div>

      {theirLikes.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Toys they liked from you 💕</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {theirLikes.map(sw => {
              const toy = useStore.getState().getToy(sw.toy_id)
              if (!toy) return null
              return (
                <div key={sw.id} className="flex-shrink-0 w-28 bg-white rounded-xl overflow-hidden shadow-sm">
                  <img src={toy.photos[0]} className="w-full h-20 object-cover" alt="" />
                  <p className="p-2 text-xs font-medium truncate">{toy.title}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {ourLikes.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Toys you liked from them ❤️</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {ourLikes.map(sw => {
              const toy = useStore.getState().getToy(sw.toy_id)
              if (!toy) return null
              return (
                <div key={sw.id} className="flex-shrink-0 w-28 bg-white rounded-xl overflow-hidden shadow-sm">
                  <img src={toy.photos[0]} className="w-full h-20 object-cover" alt="" />
                  <p className="p-2 text-xs font-medium truncate">{toy.title}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Proposals */}
      {proposals.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Swap Proposals 🔄</h3>
          {proposals.map(p => {
            const offered = useStore.getState().getToy(p.offered_toy_id)
            const requested = useStore.getState().getToy(p.requested_toy_id)
            const isOurs = p.proposer_id === user.id
            return (
              <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm mb-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 text-center">
                    <img src={offered?.photos[0]} className="w-16 h-16 rounded-xl object-cover mx-auto" alt="" />
                    <p className="text-xs mt-1 truncate">{offered?.title}</p>
                  </div>
                  <span className="text-2xl">🔄</span>
                  <div className="flex-1 text-center">
                    <img src={requested?.photos[0]} className="w-16 h-16 rounded-xl object-cover mx-auto" alt="" />
                    <p className="text-xs mt-1 truncate">{requested?.title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-3 py-1 rounded-full ${p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : p.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.status === 'pending' ? '⏳ Pending' : p.status === 'accepted' ? '✅ Accepted' : '❌ Declined'}
                  </span>
                  {p.status === 'pending' && !isOurs && (
                    <div className="flex gap-2">
                      <button onClick={() => respondToProposal(p.id, 'accepted')} className="text-xs bg-green-500 text-white px-3 py-1 rounded-full">Accept</button>
                      <button onClick={() => respondToProposal(p.id, 'declined')} className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">Decline</button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <button onClick={() => setShowPropose(true)} className="w-full py-4 bg-[#FF2D55] text-white rounded-2xl font-semibold active:scale-95 transition-transform">Propose a Swap 🔄</button>

      {/* Propose modal */}
      <AnimatePresence>
        {showPropose && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setShowPropose(false)}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }} className="bg-white rounded-t-3xl w-full max-w-md mx-auto p-6" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-4">Propose a Swap 🔄</h2>
              <p className="text-sm text-gray-500 mb-3">Your toy to offer:</p>
              <div className="flex gap-2 overflow-x-auto mb-4 pb-2">
                {myToys.filter(t => t.is_available).map(t => (
                  <button key={t.id} onClick={() => setMyToyId(t.id)} className={`flex-shrink-0 w-24 rounded-xl overflow-hidden border-2 ${myToyId === t.id ? 'border-[#FF2D55]' : 'border-transparent'}`}>
                    <img src={t.photos[0]} className="w-full h-16 object-cover" alt="" />
                    <p className="text-xs p-1 truncate">{t.title}</p>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mb-3">Their toy you want:</p>
              <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
                {partnerToys.filter(t => t.is_available).map(t => (
                  <button key={t.id} onClick={() => setTheirToyId(t.id)} className={`flex-shrink-0 w-24 rounded-xl overflow-hidden border-2 ${theirToyId === t.id ? 'border-[#FF2D55]' : 'border-transparent'}`}>
                    <img src={t.photos[0]} className="w-full h-16 object-cover" alt="" />
                    <p className="text-xs p-1 truncate">{t.title}</p>
                  </button>
                ))}
              </div>
              <button onClick={handlePropose} disabled={!myToyId || !theirToyId} className="w-full py-4 bg-[#FF2D55] text-white rounded-2xl font-semibold disabled:opacity-40 active:scale-95 transition-transform">Send Proposal</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

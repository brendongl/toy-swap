import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useShallow } from 'zustand/shallow'

export default function Matches() {
  const matches = useStore(useShallow(s => s.getUserMatches()))
  const getMatchPartner = useStore(s => s.getMatchPartner)
  const nav = useNavigate()

  return (
    <div className="px-6 pt-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Matches 💬</h1>
      {matches.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">💝</div>
          <p className="text-gray-400">No matches yet</p>
          <p className="text-gray-400 text-sm">Keep swiping to find matches!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {matches.map(match => {
            const partner = getMatchPartner(match)
            if (!partner) return null
            return (
              <button key={match.id} onClick={() => nav(`/matches/${match.id}`)} className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform text-left">
                <img src={partner.profile_photo_url} className="w-14 h-14 rounded-full object-cover" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">{partner.name}</h3>
                    <span className="text-xs text-gray-400">{new Date(match.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-500">{'⭐'.repeat(Math.round(partner.trust_score))} • {partner.swaps_completed} swaps</p>
                  <p className="text-xs text-gray-400">📍 {partner.district}</p>
                </div>
                <span className="text-gray-300">›</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

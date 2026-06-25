import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useShallow } from 'zustand/shallow'

export default function Profile() {
  const user = useStore(s => s.currentUser)
  const toys = useStore(useShallow(s => s.getUserToys(user?.id || '')))
  const logout = useStore(s => s.logout)
  const nav = useNavigate()

  if (!user) return null

  return (
    <div className="px-6 pt-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile 👤</h1>

      <div className="bg-white rounded-3xl p-6 shadow-sm text-center mb-6">
        <img src={user.profile_photo_url} className="w-24 h-24 rounded-full object-cover mx-auto mb-3" alt="" />
        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500">📍 {user.district}</p>
        <div className="flex justify-center mt-2">
          <span className="text-yellow-500 text-lg">{'⭐'.repeat(Math.round(user.trust_score))}</span>
          <span className="text-gray-400 ml-1">({user.trust_score})</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#FF2D55]">{toys.length}</p>
          <p className="text-sm text-gray-500">Toys Listed 🧸</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-[#FFB800]">{user.swaps_completed}</p>
          <p className="text-sm text-gray-500">Swaps Done 🔄</p>
        </div>
      </div>

      {user.children_ages.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Children's Ages 👶</h3>
          <div className="flex gap-2 flex-wrap">
            {user.children_ages.map(a => (
              <span key={a} className="px-3 py-1 bg-[#FFF0F3] text-[#FF2D55] rounded-full text-sm">{a}</span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="px-4 py-4 border-b border-gray-50 flex items-center justify-between">
          <span className="text-gray-700">🌐 Language</span>
          <span className="text-gray-400 text-sm">EN / VI</span>
        </div>
        <div className="px-4 py-4 border-b border-gray-50 flex items-center justify-between">
          <span className="text-gray-700">🔔 Notifications</span>
          <span className="text-green-500 text-sm">On</span>
        </div>
        <div className="px-4 py-4 flex items-center justify-between">
          <span className="text-gray-700">ℹ️ About ToySwap</span>
          <span className="text-gray-400 text-sm">v1.0.0</span>
        </div>
      </div>

      <button onClick={() => { logout(); nav('/') }} className="w-full py-4 bg-white text-red-500 rounded-2xl font-semibold border border-red-100 active:scale-95 transition-transform mb-8">Log Out</button>
    </div>
  )
}

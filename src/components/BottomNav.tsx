import { useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '../store'
import { useShallow } from 'zustand/shallow'

const tabs = [
  { path: '/', label: 'Browse', icon: '🏠' },
  { path: '/my-toys', label: 'My Toys', icon: '🧸' },
  { path: '/matches', label: 'Matches', icon: '💬' },
  { path: '/profile', label: 'Profile', icon: '👤' },
]

export default function BottomNav() {
  const nav = useNavigate()
  const loc = useLocation()
  const matches = useStore(useShallow(s => s.getUserMatches()))
  const matchCount = matches.length

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {tabs.map(t => {
        const active = t.path === '/' ? loc.pathname === '/' : loc.pathname.startsWith(t.path)
        return (
          <button key={t.path} onClick={() => nav(t.path)} className="flex-1 flex flex-col items-center py-2 relative">
            <span className="text-xl">{t.icon}</span>
            <span className={`text-xs mt-0.5 ${active ? 'text-[#FF2D55] font-semibold' : 'text-gray-400'}`}>{t.label}</span>
            {t.path === '/matches' && matchCount > 0 && (
              <span className="absolute top-1 right-1/4 w-4 h-4 bg-[#FF2D55] rounded-full text-white text-[10px] flex items-center justify-center">{matchCount}</span>
            )}
            {active && <div className="absolute bottom-0 w-8 h-0.5 bg-[#FF2D55] rounded-full" />}
          </button>
        )
      })}
    </nav>
  )
}

import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useShallow } from 'zustand/shallow'

export default function Chat() {
  const { matchId } = useParams()
  const nav = useNavigate()
  const user = useStore(s => s.currentUser)
  const match = useStore(s => s.matches.find(m => m.id === matchId))
  const partner = useStore(s => match ? s.getMatchPartner(match) : undefined)
  const messages = useStore(useShallow(s => s.getMatchMessages(matchId || '')))
  const proposals = useStore(useShallow(s => s.getMatchProposals(matchId || '')))
  const sendMessage = useStore(s => s.sendMessage)
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages.length])

  if (!match || !partner || !user) return <div className="p-6">Chat not found</div>

  const acceptedProposal = proposals.find(p => p.status === 'accepted')
  const swapCode = acceptedProposal ? '482791' : null

  const handleSend = () => {
    if (!text.trim()) return
    sendMessage(match.id, text.trim())
    setText('')
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => nav(`/matches/${matchId}`)} className="text-[#FF2D55] text-lg">←</button>
        <img src={partner.profile_photo_url} className="w-10 h-10 rounded-full object-cover" alt="" />
        <div>
          <h3 className="font-semibold text-sm">{partner.name}</h3>
          <p className="text-xs text-gray-400">📍 {partner.district}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
        {swapCode && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center mb-4">
            <p className="text-green-700 font-semibold">🎉 Swap Agreed!</p>
            <p className="text-2xl font-bold text-green-800 mt-1">Code: {swapCode}</p>
            <p className="text-sm text-green-600 mt-1">📍 Starbucks Thao Dien</p>
          </div>
        )}
        {messages.map(msg => {
          const isMe = msg.sender_id === user.id
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${isMe ? 'bg-[#FF2D55] text-white rounded-br-md' : 'bg-white text-gray-800 rounded-bl-md shadow-sm'}`}>
                <p className="text-sm">{msg.content}</p>
                <p className={`text-[10px] mt-1 ${isMe ? 'text-white/60' : 'text-gray-400'}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white px-4 py-3 border-t border-gray-100 flex gap-2" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 80px)' }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Type a message..." className="flex-1 px-4 py-3 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:border-[#FF2D55] text-sm" />
        <button onClick={handleSend} className="w-12 h-12 bg-[#FF2D55] rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">📤</button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useStore(s => s.login)
  const nav = useNavigate()

  const handleLogin = () => {
    if (!email) return
    const user = login(email, password)
    if (!user.is_onboarded) nav('/onboarding')
    else nav('/')
  }

  return (
    <div className="h-full flex flex-col px-6 pt-16">
      <button onClick={() => nav(-1)} className="text-[#FF2D55] text-lg mb-6">← Back</button>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back! 👋</h1>
      <p className="text-gray-500 mb-8">Log in to continue swapping</p>
      <div className="space-y-4">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full px-4 py-4 bg-white rounded-2xl border border-gray-200 text-lg focus:outline-none focus:border-[#FF2D55]" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-4 py-4 bg-white rounded-2xl border border-gray-200 text-lg focus:outline-none focus:border-[#FF2D55]" />
        <button onClick={handleLogin} className="w-full py-4 bg-[#FF2D55] text-white rounded-2xl text-lg font-semibold mt-4 active:scale-95 transition-transform">Log In</button>
      </div>
      <p className="text-center text-gray-400 mt-6 text-sm">Demo: use any email — "demo@toyswap.com" for pre-loaded data</p>
    </div>
  )
}

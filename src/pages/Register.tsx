import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'

const districts = ['District 1','District 2','District 3','District 4','District 5','District 6','District 7','District 8','District 9','District 10','District 11','District 12','Binh Thanh','Go Vap','Phu Nhuan','Tan Binh','Tan Phu','Thu Duc']

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [district, setDistrict] = useState('District 2')
  const login = useStore(s => s.login)
  const nav = useNavigate()

  const handleRegister = () => {
    if (!name || !email) return
    login(email, password, name, district)
    nav('/onboarding')
  }

  return (
    <div className="h-full flex flex-col px-6 pt-16">
      <button onClick={() => nav(-1)} className="text-[#FF2D55] text-lg mb-6">← Back</button>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account 🎉</h1>
      <p className="text-gray-500 mb-8">Join the toy swapping community</p>
      <div className="space-y-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="w-full px-4 py-4 bg-white rounded-2xl border border-gray-200 text-lg focus:outline-none focus:border-[#FF2D55]" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full px-4 py-4 bg-white rounded-2xl border border-gray-200 text-lg focus:outline-none focus:border-[#FF2D55]" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-4 py-4 bg-white rounded-2xl border border-gray-200 text-lg focus:outline-none focus:border-[#FF2D55]" />
        <select value={district} onChange={e => setDistrict(e.target.value)} className="w-full px-4 py-4 bg-white rounded-2xl border border-gray-200 text-lg focus:outline-none focus:border-[#FF2D55]">
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button onClick={handleRegister} className="w-full py-4 bg-[#FF2D55] text-white rounded-2xl text-lg font-semibold mt-4 active:scale-95 transition-transform">Create Account</button>
      </div>
    </div>
  )
}

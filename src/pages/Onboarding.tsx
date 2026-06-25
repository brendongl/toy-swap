import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore, type AgeRange } from '../store'

const slides = [
  { emoji: '👆', title: 'Browse toys your kid will love', desc: 'Swipe through toys from parents in your neighborhood' },
  { emoji: '🤝', title: 'Match with parents nearby', desc: 'When you both like each other\'s toys, it\'s a match!' },
  { emoji: '🔄', title: 'Arrange a simple swap', desc: 'No money needed — just happy kids with new-to-them toys' },
]

const ageRanges: AgeRange[] = ['0-1yr', '1-3yr', '3-5yr', '5-8yr', '8+']

export default function Onboarding() {
  const [step, setStep] = useState(0) // 0-2 slides, 3 = ages, 4 = add toy
  const [ages, setAges] = useState<AgeRange[]>([])
  const [toyTitle, setToyTitle] = useState('')
  const [toyAge, setToyAge] = useState<AgeRange>('1-3yr')
  const [toyCondition, setToyCondition] = useState<'like_new'|'good'|'fair'|'well_loved'>('good')
  const { completeOnboarding, addToy } = useStore()
  const nav = useNavigate()

  const toggleAge = (a: AgeRange) => setAges(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])

  const finish = () => {
    completeOnboarding(ages)
    if (toyTitle) {
      addToy({ title: toyTitle, description: '', age_range: toyAge, condition: toyCondition, brand: '', photos: [`https://picsum.photos/seed/${Date.now()}/400/400`] })
    }
    nav('/')
  }

  return (
    <div className="h-full flex flex-col px-6 pt-16">
      <AnimatePresence mode="wait">
        {step < 3 ? (
          <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-7xl mb-8">{slides[step].emoji}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{slides[step].title}</h2>
            <p className="text-gray-500 text-lg mb-12">{slides[step].desc}</p>
            <div className="flex gap-2 mb-8">
              {[0,1,2].map(i => <div key={i} className={`w-3 h-3 rounded-full ${i === step ? 'bg-[#FF2D55]' : 'bg-gray-200'}`} />)}
            </div>
            <button onClick={() => setStep(step + 1)} className="w-full py-4 bg-[#FF2D55] text-white rounded-2xl text-lg font-semibold active:scale-95 transition-transform">
              {step === 2 ? "Let's Go! 🚀" : 'Next'}
            </button>
          </motion.div>
        ) : step === 3 ? (
          <motion.div key="ages" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your child's age? 👶</h2>
            <p className="text-gray-500 mb-6">Select all that apply</p>
            <div className="space-y-3 mb-8">
              {ageRanges.map(a => (
                <button key={a} onClick={() => toggleAge(a)} className={`w-full py-4 rounded-2xl text-lg font-medium border-2 transition-all ${ages.includes(a) ? 'bg-[#FF2D55] text-white border-[#FF2D55]' : 'bg-white text-gray-700 border-gray-200'}`}>{a}</button>
              ))}
            </div>
            <button onClick={() => setStep(4)} disabled={ages.length === 0} className="w-full py-4 bg-[#FF2D55] text-white rounded-2xl text-lg font-semibold disabled:opacity-40 active:scale-95 transition-transform">Continue</button>
          </motion.div>
        ) : (
          <motion.div key="toy" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Add your first toy! 🧸</h2>
            <p className="text-gray-500 mb-6">Or skip for now</p>
            <div className="space-y-4 mb-8">
              <div className="w-full h-40 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl">📸</div>
              <input value={toyTitle} onChange={e => setToyTitle(e.target.value)} placeholder="Toy name" className="w-full px-4 py-4 bg-white rounded-2xl border border-gray-200 text-lg focus:outline-none focus:border-[#FF2D55]" />
              <select value={toyAge} onChange={e => setToyAge(e.target.value as AgeRange)} className="w-full px-4 py-4 bg-white rounded-2xl border border-gray-200 text-lg">
                {ageRanges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <select value={toyCondition} onChange={e => setToyCondition(e.target.value as any)} className="w-full px-4 py-4 bg-white rounded-2xl border border-gray-200 text-lg">
                <option value="like_new">Like New ✨</option>
                <option value="good">Good 👍</option>
                <option value="fair">Fair 👌</option>
                <option value="well_loved">Well Loved 💕</option>
              </select>
            </div>
            <button onClick={finish} className="w-full py-4 bg-[#FF2D55] text-white rounded-2xl text-lg font-semibold active:scale-95 transition-transform">{toyTitle ? 'Add Toy & Start Browsing' : 'Skip & Start Browsing'}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

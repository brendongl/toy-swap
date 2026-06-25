import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore, type AgeRange, type Condition } from '../store'
import { useShallow } from 'zustand/shallow'

const conditionLabels: Record<string, string> = { like_new: 'Like New ✨', good: 'Good 👍', fair: 'Fair 👌', well_loved: 'Well Loved 💕' }
const ageRanges: AgeRange[] = ['0-1yr', '1-3yr', '3-5yr', '5-8yr', '8+']

export default function MyToys() {
  const user = useStore(s => s.currentUser)
  const toys = useStore(useShallow(s => s.getUserToys(user?.id || '')))
  const { addToy, updateToy, deleteToy } = useStore()
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [age, setAge] = useState<AgeRange>('1-3yr')
  const [cond, setCond] = useState<Condition>('good')
  const [brand, setBrand] = useState('')

  const handleAdd = () => {
    if (!title) return
    addToy({ title, description: desc, age_range: age, condition: cond, brand, photos: [`https://picsum.photos/seed/${Date.now()}/400/400`] })
    setTitle(''); setDesc(''); setBrand(''); setShowAdd(false)
  }

  return (
    <div className="px-6 pt-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Toys 🧸</h1>
      {toys.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-gray-400">No toys listed yet</p>
          <p className="text-gray-400 text-sm">Tap + to add your first toy!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {toys.map(toy => (
            <motion.div key={toy.id} layout className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <img src={toy.photos[0]} className="w-full h-32 object-cover" alt="" />
              <div className="p-3">
                <h3 className="font-semibold text-sm truncate">{toy.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{conditionLabels[toy.condition]}</p>
                <div className="flex items-center justify-between mt-2">
                  <button onClick={() => updateToy(toy.id, { is_available: !toy.is_available })} className={`text-xs px-2 py-1 rounded-full ${toy.is_available ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {toy.is_available ? '✅ Available' : '⏸ Paused'}
                  </button>
                  <button onClick={() => deleteToy(toy.id)} className="text-xs text-red-400">🗑️</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* FAB */}
      <button onClick={() => setShowAdd(true)} className="fixed bottom-24 right-6 w-14 h-14 bg-[#FF2D55] rounded-full shadow-xl flex items-center justify-center text-white text-2xl z-40 active:scale-90 transition-transform">+</button>

      {/* Add toy modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setShowAdd(false)}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }} className="bg-white rounded-t-3xl w-full max-w-md mx-auto p-6 max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-4">Add a Toy 🧸</h2>
              <div className="space-y-3">
                <div className="w-full h-32 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl">📸 Tap to add photo</div>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Toy name *" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF2D55]" />
                <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description (optional)" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF2D55] h-20 resize-none" />
                <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="Brand (optional)" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF2D55]" />
                <select value={age} onChange={e => setAge(e.target.value as AgeRange)} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                  {ageRanges.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <select value={cond} onChange={e => setCond(e.target.value as Condition)} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                  <option value="like_new">Like New ✨</option>
                  <option value="good">Good 👍</option>
                  <option value="fair">Fair 👌</option>
                  <option value="well_loved">Well Loved 💕</option>
                </select>
                <button onClick={handleAdd} className="w-full py-4 bg-[#FF2D55] text-white rounded-2xl font-semibold active:scale-95 transition-transform">Add Toy</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

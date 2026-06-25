import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Welcome() {
  const nav = useNavigate()
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.8 }}>
        <div className="w-28 h-28 bg-[#FF2D55] rounded-[28px] flex items-center justify-center text-white text-5xl font-bold mb-6 mx-auto shadow-lg">🧸</div>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl font-bold text-gray-800 mb-2">ToySwap</motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-lg text-gray-500 mb-12">Swipe. Match. Swap. 🔄</motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="w-full space-y-3">
        <button onClick={() => nav('/register')} className="w-full py-4 bg-[#FF2D55] text-white rounded-2xl text-lg font-semibold shadow-lg active:scale-95 transition-transform">Get Started 🎉</button>
        <button onClick={() => nav('/login')} className="w-full py-4 bg-white text-[#FF2D55] rounded-2xl text-lg font-semibold border-2 border-[#FF2D55] active:scale-95 transition-transform">I Have an Account</button>
      </motion.div>
    </div>
  )
}

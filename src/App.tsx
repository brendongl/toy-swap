import { Component, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import Browse from './pages/Browse'
import MyToys from './pages/MyToys'
import Matches from './pages/Matches'
import MatchDetail from './pages/MatchDetail'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import BottomNav from './components/BottomNav'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div className="h-full flex flex-col items-center justify-center px-8 text-center bg-[#FFF9F5]">
          <div className="text-5xl mb-4">😵</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-500 mb-4 text-sm">{this.state.error.message}</p>
          <button onClick={() => { localStorage.removeItem('toyswap-storage'); window.location.href = '/' }}
            className="px-6 py-3 bg-[#FF2D55] text-white rounded-2xl font-semibold">
            Reset & Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function AppRoutes() {
  const user = useStore(s => s.currentUser)

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    )
  }

  if (!user.is_onboarded) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" />} />
      </Routes>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto pb-20">
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/my-toys" element={<MyToys />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/matches/:id" element={<MatchDetail />} />
          <Route path="/chat/:matchId" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <div className="h-full max-w-md mx-auto bg-[#FFF9F5] relative">
        <AppRoutes />
      </div>
    </BrowserRouter>
    </ErrorBoundary>
  )
}

'use client'

import { useState, useEffect } from 'react'

const CARDS = [
  {
    type: 'blog',
    title: 'Update Blog',
    desc: 'Trigger revalidate untuk semua halaman blog. Gunakan ini jika ada perubahan pada data blog di Sanity.',
  },
  {
    type: 'project',
    title: 'Update Project',
    desc: 'Trigger revalidate untuk semua halaman project. Gunakan ini jika ada perubahan pada data project di Sanity.',
  },
  {
    type: 'app',
    title: 'Update App',
    desc: 'Trigger revalidate untuk semua halaman app/store. Gunakan ini jika ada perubahan pada data aplikasi di Sanity.',
  },
  {
    type: 'category',
    title: 'Update Category',
    desc: 'Trigger revalidate untuk kategori yang mempengaruhi apps dan blog. Gunakan ini jika ada perubahan kategori di Sanity.',
  },
  {
    type: 'transaction',
    title: 'Update Transaction',
    desc: 'Trigger revalidate untuk data transaksi. Gunakan ini jika ada perubahan pada data transaksi di Sanity.',
  },
]

export default function AdminPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState({})

  // Cek localStorage saat mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('admin_logged_in')
      if (loggedIn === 'true') setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === 'gugus' && password === 'gugus$111$') {
      setIsLoggedIn(true)
      setMessage('Login success!')
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_logged_in', 'true')
      }
    } else {
      setMessage('Invalid username or password')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setMessage('')
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_logged_in')
    }
  }

  const handleTriggerUpdate = async (type) => {
    setLoading(type)
    setResults((prev) => ({ ...prev, [type]: null }))
    setMessage('')
    try {
      const res = await fetch('/api/sanity-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _type: type, _id: 'admin-trigger', operation: 'manual' })
      })
      const data = await res.json()
      setResults((prev) => ({ ...prev, [type]: data }))
      setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} update triggered!`)
    } catch (err) {
      setMessage(`Failed to trigger update for ${type}`)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300 transition-colors"
          >
            Login
          </button>
          {message && <div className="mt-4 text-center text-red-400">{message}</div>}
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white py-10">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">Admin Panel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {CARDS.map(card => (
            <div key={card.type} className="bg-gray-900 rounded-lg p-6 shadow border border-gray-700 flex flex-col items-center">
              <h3 className="text-lg font-bold mb-2 text-yellow-300">{card.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{card.desc}</p>
              <button
                onClick={() => handleTriggerUpdate(card.type)}
                className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-300 transition-colors mb-2"
                disabled={loading === card.type}
              >
                {loading === card.type ? 'Updating...' : card.title}
              </button>
              {results[card.type] && (
                <pre className="bg-gray-800 text-xs p-2 rounded mt-2 text-left overflow-x-auto max-h-40 w-full">{JSON.stringify(results[card.type], null, 2)}</pre>
              )}
            </div>
          ))}
        </div>
        {message && <div className="mb-2 text-green-400">{message}</div>}
        <button
          onClick={handleLogout}
          className="mt-6 text-sm text-gray-400 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  )
} 
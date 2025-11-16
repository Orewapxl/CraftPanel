"use client"

import { Zap } from 'lucide-react'

export default function Navbar() {

  return (
    <nav className="fixed w-full top-0 z-50 bg-slate-950/98 backdrop-blur-sm border-b border-lime-500/20">
      <div className="max-w-1xl mx-auto px-1 sm:px-1 lg:px-1">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-br from-lime-400 to-lime-500 rounded-lg flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-lime-500/50 group-hover:shadow-lime-400/70 transition-all">
              CP
            </div>
            <div>
              <span className="text-lg font-black bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent group-hover:from-lime-300 group-hover:to-lime-200 transition-all">
                CraftPanel
              </span>
              <div className="h-0.5 w-8 bg-gradient-to-r from-lime-400 to-transparent group-hover:w-full transition-all"></div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-slate-300 hover:text-lime-400 transition-colors font-medium">
              Sign In
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-lime-500/50 border border-lime-300 hover:-translate-y-1 flex items-center gap-2">
              <Zap size={16} />
              Get Started
            </button>
          </div>
        </div>

      </div>
    </nav>
  )
}

import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 relative overflow-hidden">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 pointer-events-none"></div>
      
      {/* Header */}
      <header className="relative z-10">
        <div className="bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-blue-900/95 backdrop-blur-xl text-white px-6 py-2 border-b border-white/10">
          <div className="flex items-center justify-center text-sm font-medium">
            <span>14:30</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-blue-900/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-white/30">
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-slate-800 font-bold">
                    JSL
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight drop-shadow-lg">GOBApps</h1>
                  <p className="text-xs text-blue-100 font-medium">Propulsé par JSL AI</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl transition-all flex items-center justify-center border border-white/20 shadow-lg">
                  🎨
                </button>
                <button className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl transition-all flex items-center justify-center border border-white/20 shadow-lg">
                  ⚙️
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10 pb-32">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          {/* App Cards */}
          <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl cursor-pointer hover:bg-white/30 hover:backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-300">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl shadow-2xl flex items-center justify-center border border-white/50 relative" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="text-3xl">💻</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold text-slate-900 line-clamp-1 drop-shadow-sm">GitHub</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl cursor-pointer hover:bg-white/30 hover:backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-300">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl shadow-2xl flex items-center justify-center border border-white/50 relative" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="text-3xl">💼</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold text-slate-900 line-clamp-1 drop-shadow-sm">LinkedIn</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl cursor-pointer hover:bg-white/30 hover:backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-300">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl shadow-2xl flex items-center justify-center border border-white/50 relative" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="text-3xl">🌐</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold text-slate-900 line-clamp-1 drop-shadow-sm">Google</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl cursor-pointer hover:bg-white/30 hover:backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-300">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl shadow-2xl flex items-center justify-center border border-white/50 relative" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="text-3xl">📧</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold text-slate-900 line-clamp-1 drop-shadow-sm">Yahoo</p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-28 right-6 z-40">
        <button className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-white/90 backdrop-blur-xl text-slate-700 border-2 border-white/50 shadow-xl">
          ✏️
        </button>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 pointer-events-none z-50">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-3xl rounded-t-[2.5rem] shadow-2xl px-6 py-4 border-t border-white/50">
            <div className="flex justify-center">
              <div className="w-32 h-1.5 bg-slate-900/40 rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
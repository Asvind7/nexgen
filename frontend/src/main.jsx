import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import './animations.css'
import App from './App.jsx'

// Fallback UI for fatal crashes
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-6 md:p-12 font-sans text-center">
    <div className="bg-red-950/20 border border-red-500/30 p-8 rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <h1 className="text-2xl font-black text-white mb-2 relative z-10">System Crash</h1>
      <p className="text-slate-400 mb-6 text-sm relative z-10">A fatal error occurred in the logic tree.</p>

      <div className="bg-slate-900/80 p-6 rounded-2xl border border-red-500/20 text-left font-mono text-xs overflow-auto text-red-300 relative z-10 max-h-64 shadow-inner">
        <strong className="block text-red-400 mb-2 truncate">{error.message}</strong>
        <pre className="whitespace-pre-wrap">{error.stack}</pre>
      </div>

      <button
        onClick={() => {
          // Attempt to clean completely if the state got horribly mangled
          localStorage.clear();
          window.location.reload();
        }}
        className="mt-8 px-8 py-4 bg-red-600/10 hover:bg-red-600 border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg active:scale-95 relative z-10"
      >
        Emergency Reboot & Clear State
      </button>
    </div>
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

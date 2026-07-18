export default function Toast({ message }) {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full text-sm shadow-lg z-[200] fade-in max-w-xs text-center whitespace-pre-line">
      <i className="fas fa-check-circle text-emerald-400 mr-2" />
      {message}
    </div>
  )
}

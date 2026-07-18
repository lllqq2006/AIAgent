/**
 * 首页主顶部状态栏（固定定位，带 Logo、通知铃、用户头像）
 *
 * Props:
 *   currentUser  - 当前登录用户对象
 *   onNavigate   - 页面跳转回调
 *   showToast    - 轻提示回调
 */
export default function TopBar({ currentUser, onNavigate, showToast }) {
  const firstName = currentUser?.name?.charAt(0) || '用'

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-emerald-100 z-50 px-4 py-3 safe-top">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* 左侧：Logo + 名称 + 状态 */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-green rounded-lg flex items-center justify-center text-white text-sm">
            <i className="fas fa-shield-alt" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-800 leading-tight">校园低空安全卫士平台</h1>
            <div className="flex items-center space-x-1 text-xs text-emerald-600">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full status-breathe" />
              <span>空域监控正常</span>
            </div>
          </div>
        </div>

        {/* 右侧：通知铃 + 头像 */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => showToast('您有 2 条新的风险提醒')}
            className="relative p-2 text-slate-600 hover:text-emerald-600 transition active:scale-95"
          >
            <i className="fas fa-bell text-lg" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-xs font-bold border-2 border-emerald-200 overflow-hidden"
          >
            {firstName}
          </button>
        </div>
      </div>
    </header>
  )
}

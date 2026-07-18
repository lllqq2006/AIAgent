/**
 * 首页底部导航栏（固定定位，首页 / 举报 / 我的）
 *
 * Props:
 *   activeTab    - 当前激活标签 'home' | 'profile'
 *   onTabSwitch  - 标签切换回调，参数为标签名
 */
export default function BottomNav({ activeTab, onTabSwitch }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-bottom z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {/* 首页 */}
        <button
          onClick={() => onTabSwitch('home')}
          className={`nav-item flex flex-col items-center justify-center w-16 h-full space-y-1 ${
            activeTab === 'home' ? 'active' : 'text-slate-400'
          }`}
        >
          <i className="fas fa-home text-xl nav-icon transition-transform" />
          <span className="text-[10px] font-medium">首页</span>
        </button>

        {/* 举报（中间突出按钮） */}
        <button
          onClick={() => onTabSwitch('report')}
          className="nav-item flex flex-col items-center justify-center w-16 h-full space-y-1 text-slate-400"
        >
          <div className="w-12 h-12 bg-gradient-green rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200 -mt-8 border-4 border-white">
            <i className="fas fa-plus text-lg" />
          </div>
          <span className="text-[10px] font-medium">举报</span>
        </button>

        {/* 我的 */}
        <button
          onClick={() => onTabSwitch('profile')}
          className={`nav-item flex flex-col items-center justify-center w-16 h-full space-y-1 ${
            activeTab === 'profile' ? 'active' : 'text-slate-400'
          }`}
        >
          <i className="fas fa-user text-xl nav-icon transition-transform" />
          <span className="text-[10px] font-medium">我的</span>
        </button>
      </div>
    </nav>
  )
}

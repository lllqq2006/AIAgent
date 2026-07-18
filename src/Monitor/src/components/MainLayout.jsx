import { useState } from 'react'
import TopBar from './TopBar'
import BottomNav from './BottomNav'

export default function MainLayout({ currentUser, onNavigate, showToast }) {
  const [activeTab, setActiveTab] = useState('home')
  const [mapError, setMapError] = useState(false)

  const handleTabSwitch = (tab) => {
    setActiveTab(tab)
    if (tab === 'report') onNavigate('report')
    if (tab === 'profile') onNavigate('profile')
  }

  return (
    <div className="pb-20">
      <TopBar currentUser={currentUser} onNavigate={onNavigate} showToast={showToast} />

      {/* 主内容区 */}
      <main className="pt-16 pb-24 px-4 max-w-md mx-auto space-y-4">

        {/* 实时态势卡片 */}
        <section className="bg-white rounded-2xl card-shadow p-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-700">周边空域态势</h2>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-medium">
              <i className="fas fa-satellite-dish mr-1" />实时
            </span>
          </div>

          <div className="map-container border border-emerald-100 mb-3">
            {!mapError ? (
              <img src="/校园地图.png" alt="校园地图" className="map-image" onError={() => setMapError(true)} />
            ) : (
              <div className="absolute inset-0 bg-slate-200 flex items-center justify-center flex-col text-slate-500">
                <i className="fas fa-map text-3xl mb-2" />
                <span className="text-xs">请放置"校园地图.png"到 public 文件夹</span>
              </div>
            )}

            <div className="absolute inset-0 bg-emerald-900/5 pointer-events-none" />

            {/* 我的位置 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative w-4 h-4 bg-emerald-500 rounded-full pulse-dot" />
              <div className="absolute -inset-4 bg-emerald-400/30 rounded-full blur-md" />
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white/95 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full border border-emerald-200 font-medium shadow-sm backdrop-blur">
                我的位置
              </div>
            </div>

            {/* 疑似黑飞 */}
            <div className="absolute top-1/3 left-1/4 z-10">
              <div className="relative w-3 h-3 bg-red-500 rounded-full risk-ripple" />
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-red-50/95 text-red-600 text-[10px] px-2 py-0.5 rounded-full border border-red-200 font-medium shadow-sm backdrop-blur">
                疑似黑飞
              </div>
            </div>

            {/* 注意观察 */}
            <div className="absolute top-1/2 right-1/4 z-10">
              <div className="relative w-3 h-3 bg-orange-500 rounded-full">
                <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping" />
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-orange-50/95 text-orange-600 text-[10px] px-2 py-0.5 rounded-full border border-orange-200 font-medium shadow-sm backdrop-blur">
                注意观察
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-2 border-emerald-300/60 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52 border border-emerald-200/40 rounded-full pointer-events-none" />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm z-20">
              <i className="fas fa-map-marked-alt mr-1" />苏州职业技术大学实时监控
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
              <div className="text-lg font-bold text-slate-800">0</div>
              <div className="text-[10px] text-slate-500">合规飞行</div>
            </div>
            <div className="bg-red-50 rounded-lg p-2 border border-red-100">
              <div className="text-lg font-bold text-red-600">1</div>
              <div className="text-[10px] text-red-500">异常目标</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100">
              <div className="text-lg font-bold text-emerald-600">3</div>
              <div className="text-[10px] text-emerald-600">设备在线</div>
            </div>
          </div>
        </section>

        {/* 快捷操作网格 */}
        <section className="grid grid-cols-4 gap-3">
          <button onClick={() => onNavigate('report')}
            className="col-span-2 row-span-2 bg-gradient-green text-white rounded-2xl p-4 flex flex-col justify-between items-start card-shadow active:scale-95 transition-transform">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <i className="fas fa-camera text-xl" />
            </div>
            <div>
              <div className="font-bold text-lg">立即举报</div>
              <div className="text-xs text-emerald-100 mt-0.5">拍摄可疑飞行器</div>
            </div>
          </button>

          <button onClick={() => showToast('进入预警中心...')}
            className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center card-shadow border border-slate-100 active:scale-95 transition-transform">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-1.5">
              <i className="fas fa-bell text-sm" />
            </div>
            <span className="text-[11px] font-medium text-slate-700">预警</span>
          </button>

          <button onClick={() => onNavigate('tracking')}
            className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center card-shadow border border-slate-100 active:scale-95 transition-transform">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-1.5">
              <i className="fas fa-tasks text-sm" />
            </div>
            <span className="text-[11px] font-medium text-slate-700">跟踪</span>
          </button>

          <button onClick={() => onNavigate('education')}
            className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center card-shadow border border-slate-100 active:scale-95 transition-transform">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-1.5">
              <i className="fas fa-book-open text-sm" />
            </div>
            <span className="text-[11px] font-medium text-slate-700">学习</span>
          </button>

          <button onClick={() => { if (window.confirm('确认拨打校园安全电话 0512-XXXXXXX？')) window.location.href = 'tel:110' }}
            className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center card-shadow border border-slate-100 active:scale-95 transition-transform">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-1.5">
              <i className="fas fa-phone-alt text-sm" />
            </div>
            <span className="text-[11px] font-medium text-slate-700">报警</span>
          </button>
        </section>

        {/* 风险预警流 */}
        <section className="bg-white rounded-2xl card-shadow overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700">附近风险提醒</h2>
            <button className="text-xs text-emerald-600 font-medium">查看全部</button>
          </div>
          <div className="divide-y divide-slate-50">
            <div className="p-4 flex items-start space-x-3 active:bg-slate-50 transition">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 shrink-0">
                <i className="fas fa-helicopter" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-slate-800 truncate">图书馆东北门上空无人机</h3>
                  <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium shrink-0 ml-2">紧急</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">距离图书馆敏感区仅50米，未查询到飞行申报记录</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">2分钟前 • 距离你 120m</span>
                  <button className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-full font-medium active:scale-95 transition">去查看</button>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-start space-x-3 active:bg-slate-50 transition">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 shrink-0">
                <i className="fas fa-info-circle" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-slate-800">今日合规飞行提醒</h3>
                  <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-medium">提示</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">测绘学院将在14:00-16:00于体育场进行无人机考试</p>
                <span className="text-[10px] text-slate-400">1小时前</span>
              </div>
            </div>
          </div>
        </section>

        {/* 我的贡献统计 */}
        <section className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 text-white card-shadow">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold opacity-90">我的安全贡献</h2>
            <i className="fas fa-chevron-right text-xs opacity-70" />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{currentUser?.reports ?? 5}</div>
              <div className="text-[10px] opacity-80">有效举报</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{currentUser?.score ?? 85}</div>
              <div className="text-[10px] opacity-80">信用积分</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{currentUser?.courses ?? 3}</div>
              <div className="text-[10px] opacity-80">学习课程</div>
            </div>
          </div>
        </section>

        {/* 安全知识速览 */}
        <section className="bg-white rounded-2xl card-shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-700">安全知识</h2>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">每日更新</span>
          </div>
          <div className="space-y-3">
            <div onClick={() => onNavigate('education')}
              className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl active:bg-slate-100 transition cursor-pointer touch-feedback">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-lg shrink-0">
                <i className="fas fa-ban" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800 mb-0.5">校园哪些地方严禁飞行？</h3>
                <p className="text-xs text-slate-500 line-clamp-1">图书馆、实验楼、行政大楼周边100米...</p>
              </div>
              <i className="fas fa-chevron-right text-slate-400 text-xs" />
            </div>
            <div onClick={() => onNavigate('education')}
              className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl active:bg-slate-100 transition cursor-pointer touch-feedback">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-lg shrink-0">
                <i className="fas fa-eye" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800 mb-0.5">如何识别"黑飞"无人机？</h3>
                <p className="text-xs text-slate-500 line-clamp-1">看颜色、听声音、观察飞行姿态...</p>
              </div>
              <i className="fas fa-chevron-right text-slate-400 text-xs" />
            </div>
          </div>
        </section>
      </main>

      <BottomNav activeTab={activeTab} onTabSwitch={handleTabSwitch} />
    </div>
  )
}

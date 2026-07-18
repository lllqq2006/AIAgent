import PageHeader from './PageHeader'

const getRoleText = (role) => {
  const map = { student: '在校学生', teacher: '教职工', staff: '其他人员', security: '安保人员' }
  return map[role] || '用户'
}

export default function ProfilePage({
  currentUser, onClose, onNavigate, onLogout, onShowAgreement, onShowPrivacy, showToast,
}) {
  const firstName = currentUser?.name?.charAt(0) || '用'

  return (
    <div className="fixed inset-0 bg-[#f0fdf4] z-[60] flex flex-col slide-up page-container overflow-y-auto hide-scrollbar">
      <PageHeader
        onBack={onClose}
        title="个人中心"
        subtitle="已实名认证"
        rightIcon="fa-cog"
        onRightClick={() => showToast('设置功能开发中...')}
      />

      <main className="px-4 py-4 max-w-md mx-auto space-y-4 pb-24">
        {/* 用户信息卡片 */}
        <section className="profile-header-bg rounded-2xl card-shadow p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10 blur-xl" />
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30 backdrop-blur-sm">
                {firstName}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-300 rounded-full border-2 border-white flex items-center justify-center">
                <i className="fas fa-check text-[8px] text-emerald-800" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-0.5">{currentUser?.name || '用户'}</h2>
              <p className="text-xs opacity-90 mb-1">{getRoleText(currentUser?.role)}</p>
              <div className="flex items-center space-x-2 text-[10px] opacity-80">
                <span>{currentUser?.dept || '未填写学院'}</span>
                {currentUser?.userId && <><span>•</span><span>学号：{currentUser.userId}</span></>}
              </div>
            </div>
          </div>
          <div className="relative mt-4 flex items-center justify-between bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
            <div className="text-center flex-1 border-r border-white/20">
              <div className="text-lg font-bold">{currentUser?.score ?? 85}</div>
              <div className="text-[10px] opacity-80">信用积分</div>
            </div>
            <div className="text-center flex-1 border-r border-white/20">
              <div className="text-lg font-bold">No.{currentUser?.rank ?? 12}</div>
              <div className="text-[10px] opacity-80">本周排名</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-lg font-bold">Lv.{currentUser?.level ?? 3}</div>
              <div className="text-[10px] opacity-80">安全等级</div>
            </div>
          </div>
        </section>

        {/* 功能菜单 */}
        <section className="bg-white rounded-2xl card-shadow overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-700">我的服务</h2>
          </div>
          <div className="grid grid-cols-4 gap-4 p-4">
            {[
              { icon: 'fa-clipboard-list', color: 'text-blue-600 bg-blue-50',   label: '举报记录', action: () => onNavigate('tracking') },
              { icon: 'fa-medal',          color: 'text-orange-600 bg-orange-50', label: '我的积分', action: () => showToast('功能开发中...') },
              { icon: 'fa-certificate',    color: 'text-purple-600 bg-purple-50', label: '安全认证', action: () => showToast('功能开发中...') },
              { icon: 'fa-hand-holding-heart', color: 'text-emerald-600 bg-emerald-50', label: '志愿巡查', action: () => showToast('功能开发中...') },
            ].map(item => (
              <button key={item.label} onClick={item.action} className="flex flex-col items-center space-y-1.5 active:scale-95 transition">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                  <i className={`fas ${item.icon}`} />
                </div>
                <span className="text-[11px] text-slate-600">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 设置列表 */}
        <section className="bg-white rounded-2xl card-shadow overflow-hidden">
          <div className="divide-y divide-slate-50">
            {[
              { icon: 'fa-user-edit',     label: '修改资料',  right: null,    action: () => onNavigate('profileEdit') },
              { icon: 'fa-bell',           label: '消息通知',  right: '已开启', action: () => showToast('功能开发中...') },
              { icon: 'fa-map-marker-alt', label: '位置授权',  right: <span className="text-xs text-emerald-600">已授权</span>, action: () => showToast('功能开发中...') },
              { icon: 'fa-file-contract',  label: '用户协议',  right: null,    action: onShowAgreement },
              { icon: 'fa-shield-alt',     label: '隐私政策',  right: null,    action: onShowPrivacy },
              { icon: 'fa-info-circle',    label: '关于我们',  right: <span className="text-xs text-slate-400">v1.0.0</span>, action: () => onNavigate('about') },
            ].map(item => (
              <button key={item.label} onClick={item.action} className="w-full flex items-center justify-between p-4 active:bg-slate-50 transition text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <i className={`fas ${item.icon} text-sm`} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.right && (typeof item.right === 'string' ? <span className="text-xs text-slate-400">{item.right}</span> : item.right)}
                  <i className="fas fa-chevron-right text-slate-400 text-xs" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 退出登录 */}
        <section className="pt-2">
          <button onClick={onLogout} className="w-full bg-white text-red-500 font-bold py-3.5 rounded-xl border border-red-100 active:bg-red-50 transition text-sm">
            <i className="fas fa-sign-out-alt mr-2" />退出登录
          </button>
        </section>
      </main>
    </div>
  )
}

import PageHeader from './PageHeader'

export default function EducationPage({ onClose, showToast }) {
  return (
    <div className="fixed inset-0 bg-[#f0fdf4] z-[70] flex flex-col slide-up page-container overflow-y-auto hide-scrollbar">
      <PageHeader
        onBack={onClose}
        title="禁飞区域详解"
        subtitle="安全知识"
        rightIcon="fa-share-alt"
        onRightClick={() => showToast('分享功能开发中...')}
      />

      <main className="px-4 py-4 max-w-md mx-auto space-y-4 pb-6">
        {/* 文章头部 */}
        <section className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl card-shadow p-5 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <i className="fas fa-ban text-2xl" />
            </div>
            <div>
              <div className="text-xs opacity-90 mb-0.5">安全知识</div>
              <h2 className="text-lg font-bold">校园哪些地方严禁飞行？</h2>
            </div>
          </div>
          <p className="text-xs opacity-90 leading-relaxed">
            根据《无人驾驶航空器飞行管理暂行条例》及校园安全管理规定，以下区域严禁未经审批的无人机飞行。
          </p>
        </section>

        {/* 绝对禁飞区 */}
        <section className="bg-white rounded-2xl card-shadow p-4 border-l-4 border-red-500">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <i className="fas fa-exclamation-triangle text-sm" />
            </div>
            <h3 className="text-base font-bold text-red-800">绝对禁飞区</h3>
          </div>
          <div className="space-y-3">
            {[
              { icon: 'fa-map-marker-alt', title: '图书馆周边', desc: '东北门附近100米范围内，包括广场和停车场区域' },
              { icon: 'fa-building',        title: '教学实验楼', desc: '惠和楼、流韵楼等教学实验楼上空及周边50米' },
              { icon: 'fa-landmark',        title: '行政办公区', desc: '行政大楼及周边敏感区域，全天候禁止飞行' },
            ].map(item => (
              <div key={item.title} className="bg-red-50 rounded-xl p-3 border border-red-100">
                <div className="flex items-start space-x-2">
                  <i className={`fas ${item.icon} text-red-500 mt-1 text-xs`} />
                  <div>
                    <div className="text-sm font-bold text-red-900 mb-1">{item.title}</div>
                    <p className="text-xs text-red-700">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center space-x-2 text-xs text-red-600 bg-red-50/50 p-2 rounded-lg">
            <i className="fas fa-ban" />
            <span>违反者将依据《治安管理处罚法》处理</span>
          </div>
        </section>

        {/* 限制飞行区 */}
        <section className="bg-white rounded-2xl card-shadow p-4 border-l-4 border-orange-500">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
              <i className="fas fa-exclamation-circle text-sm" />
            </div>
            <h3 className="text-base font-bold text-orange-800">限制飞行区</h3>
          </div>
          <div className="space-y-3">
            {[
              { icon: 'fa-running', title: '体育场',    desc: '需提前3天向保卫处申请，仅限教学活动时间' },
              { icon: 'fa-home',    title: '学生宿舍区', desc: '禁止夜间飞行（22:00-08:00），白天需提前报备' },
            ].map(item => (
              <div key={item.title} className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                <div className="flex items-start space-x-2">
                  <i className={`fas ${item.icon} text-orange-500 mt-1 text-xs`} />
                  <div>
                    <div className="text-sm font-bold text-orange-900 mb-1">{item.title}</div>
                    <p className="text-xs text-orange-700">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 合规申请流程 */}
        <section className="bg-blue-50 rounded-2xl card-shadow p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
              <i className="fas fa-lightbulb text-sm" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-800 mb-2">合规飞行申请流程</h3>
              <ol className="text-xs text-blue-700 space-y-2 list-decimal list-inside">
                <li>下载并填写《校园无人机飞行申请表》</li>
                <li>经所在学院或部门审批盖章</li>
                <li>提前3个工作日提交至保卫处</li>
                <li>获得审批编号后方可飞行</li>
              </ol>
            </div>
          </div>
        </section>

        {/* 相关知识 */}
        <section className="bg-white rounded-2xl card-shadow p-4">
          <h3 className="text-sm font-bold text-slate-700 mb-3">相关安全知识</h3>
          <div className="space-y-3">
            {[
              { icon: 'fa-eye',   color: 'text-purple-600 bg-purple-100', title: '如何识别"黑飞"无人机？', sub: '看颜色、听声音、观察飞行姿态' },
              { icon: 'fa-gavel', color: 'text-blue-600 bg-blue-100',    title: '黑飞无人机的法律责任', sub: '了解违规飞行的法律后果' },
            ].map(item => (
              <div key={item.title} onClick={() => showToast('功能开发中...')}
                className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl active:bg-slate-100 transition cursor-pointer touch-feedback">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                  <i className={`fas ${item.icon} text-sm`} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-800 mb-0.5">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.sub}</div>
                </div>
                <i className="fas fa-chevron-right text-slate-400 text-xs" />
              </div>
            ))}
          </div>
        </section>

        <section className="pt-2">
          <button onClick={onClose} className="w-full bg-gradient-green text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-200 active:scale-95 transition touch-feedback">
            <i className="fas fa-check mr-2" />我已了解
          </button>
        </section>
      </main>
    </div>
  )
}

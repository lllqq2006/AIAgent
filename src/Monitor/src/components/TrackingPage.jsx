import PageHeader from './PageHeader'

export default function TrackingPage({ onClose, showToast }) {
  return (
    <div className="fixed inset-0 bg-[#f0fdf4] z-[60] flex flex-col slide-up page-container overflow-y-auto hide-scrollbar">
      <PageHeader
        onBack={onClose}
        title="我的举报"
        subtitle="5条记录"
        rightIcon="fa-filter"
        onRightClick={() => showToast('筛选功能开发中...')}
      />

      <main className="px-4 py-4 max-w-md mx-auto space-y-4 pb-6">
        {/* 统计概览 */}
        <section className="bg-white rounded-2xl card-shadow p-4">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { val: '5', label: '全部',  color: 'text-slate-800' },
              { val: '2', label: '已结案', color: 'text-emerald-600' },
              { val: '2', label: '处理中', color: 'text-blue-600' },
              { val: '1', label: '待核查', color: 'text-orange-600' },
            ].map(s => (
              <div key={s.label} className="p-2">
                <div className={`text-lg font-bold ${s.color}`}>{s.val}</div>
                <div className={`text-[10px] ${s.color}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 筛选标签 */}
        <section className="flex space-x-2 overflow-x-auto hide-scrollbar pb-1">
          {['全部记录', '处理中', '已结案', '本月'].map((t, i) => (
            <button key={t} className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap ${i === 0 ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}>
              {t}
            </button>
          ))}
        </section>

        {/* 案件列表 */}
        <section className="space-y-3">
          {/* 处理中 */}
          <div className="bg-white rounded-2xl card-shadow p-4 border-l-4 border-blue-500">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                  <i className="fas fa-clock text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">图书馆东北门上空无人机</h3>
                  <div className="text-xs text-slate-500">编号：CASE-2026-0317-001</div>
                </div>
              </div>
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">处理中</span>
            </div>
            <div className="relative pl-5 space-y-4 mb-3">
              {[
                { done: true,  title: '已受理', desc: '保卫处已接收举报 03-17 14:32' },
                { done: true,  title: '已核查', desc: '确认为未经审批飞行 03-17 15:10' },
                { done: false, title: '待结案', desc: '等待最终处理结果' },
              ].map((step, i, arr) => (
                <div key={step.title} className="timeline-item relative">
                  <div className={`timeline-dot absolute left-0 top-1 ${step.done ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  {i < arr.length - 1 && <div className={`timeline-line ${step.done ? 'bg-emerald-200' : 'bg-slate-200'}`} />}
                  <div className="pl-4">
                    <div className={`text-xs font-bold ${step.done ? 'text-emerald-700' : 'text-slate-600'}`}>{step.title}</div>
                    <div className={`text-[10px] ${step.done ? 'text-slate-500' : 'text-slate-400'}`}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-3">
              <div className="flex items-center space-x-2 text-xs text-slate-600 mb-1">
                <i className="fas fa-map-marker-alt text-emerald-500" />
                <span>苏州职业技术大学 - 图书馆东北门</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-600">
                <i className="fas fa-camera text-emerald-500" />
                <span>已上传 3 张照片，AI识别为 DJI Mini 3</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium active:bg-slate-50 transition">查看详情</button>
              <button className="flex-1 py-2 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-xs font-medium active:bg-emerald-100 transition">催办处理</button>
            </div>
          </div>

          {/* 已结案 */}
          <div className="bg-white rounded-2xl card-shadow p-4 border-l-4 border-emerald-500">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                  <i className="fas fa-check-circle text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">体育场东侧快速穿越</h3>
                  <div className="text-xs text-slate-500">编号：CASE-2026-0310-003</div>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">已结案</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-3">
              <div className="flex items-center space-x-2 text-xs text-slate-600 mb-1">
                <i className="fas fa-gavel text-emerald-500" />
                <span className="font-medium">处理结果：警告并备案</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">操作人员为校内学生，未申报飞行计划，已进行安全教育并记录档案。</p>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span>03-10 16:45 举报</span>
              <span>03-11 09:20 结案</span>
            </div>
            <button className="w-full py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium active:bg-slate-50 transition">查看详情</button>
          </div>

          {/* 待核查 */}
          <div className="bg-white rounded-2xl card-shadow p-4 border-l-4 border-orange-500">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 shrink-0">
                  <i className="fas fa-hourglass-half text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">宿舍区夜间飞行</h3>
                  <div className="text-xs text-slate-500">编号：CASE-2026-0409-002</div>
                </div>
              </div>
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">待核查</span>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 border border-orange-100 mb-3">
              <div className="flex items-center space-x-2 text-xs text-orange-700">
                <i className="fas fa-info-circle" />
                <span>等待保卫处调取监控核实</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium active:bg-slate-50 transition">查看详情</button>
              <button className="flex-1 py-2 bg-orange-50 border border-orange-200 text-orange-600 rounded-lg text-xs font-medium active:bg-orange-100 transition">补充证据</button>
            </div>
          </div>

          {/* 已归档 */}
          <div className="bg-white rounded-2xl card-shadow p-4 border-l-4 border-slate-300 opacity-80">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 shrink-0">
                  <i className="fas fa-archive text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-1">行政楼附近悬停</h3>
                  <div className="text-xs text-slate-500">编号：CASE-2026-0205-001</div>
                </div>
              </div>
              <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">已归档</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>02-05 举报 • 已获积分 +10</span>
              <i className="fas fa-chevron-right" />
            </div>
          </div>
        </section>

        <section className="text-center py-4">
          <span className="text-xs text-slate-400">仅显示最近6个月记录</span>
        </section>
      </main>
    </div>
  )
}

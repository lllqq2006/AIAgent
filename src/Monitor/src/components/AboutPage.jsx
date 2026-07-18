import PageHeader from './PageHeader'

export default function AboutPage({ onClose }) {
  return (
    <div className="fixed inset-0 bg-[#f0fdf4] z-[70] flex flex-col slide-up page-container overflow-y-auto hide-scrollbar">
      <PageHeader onBack={onClose} title="关于我们" />

      <main className="px-4 py-8 max-w-md mx-auto text-center space-y-6 pb-6">
        <div className="w-20 h-20 bg-gradient-green rounded-2xl flex items-center justify-center text-white text-3xl mx-auto shadow-lg shadow-emerald-200">
          <i className="fas fa-shield-alt" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">校园低空安全卫士平台</h2>
          <p className="text-xs text-slate-500">版本 1.0.0 (Build 20260609)</p>
        </div>

        <div className="bg-white rounded-2xl card-shadow p-5 text-left space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">
            校园低空安全卫士平台是由苏州职业技术大学开发的校园低空空域安全综合管理平台，基于"公众参与、协同防控"理念，构建校园无人机风险的全民监测网络。
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            平台集成Remote ID实时感知、AI图像识别、风险预警推送、信用积分激励等核心功能，实现校园低空空域"发现-上报-处置-反馈"的闭环管理。
          </p>
        </div>

        <div className="bg-white rounded-2xl card-shadow p-4 text-left">
          <div className="text-xs text-slate-500 space-y-2">
            <p><i className="fas fa-building mr-2 text-emerald-500 w-4" />苏州职业技术大学</p>
            <p><i className="fas fa-envelope mr-2 text-emerald-500 w-4" />contact@suzhoupolytechnic.edu.cn</p>
            <p><i className="fas fa-phone mr-2 text-emerald-500 w-4" />0512-XXXXXXX</p>
            <p><i className="fas fa-map-marker-alt mr-2 text-emerald-500 w-4" />江苏省苏州市</p>
          </div>
        </div>

        <p className="text-xs text-slate-400">© 2026 苏州职业技术大学 版权所有</p>
      </main>
    </div>
  )
}

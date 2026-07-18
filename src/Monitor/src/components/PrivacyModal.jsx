export default function PrivacyModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm max-h-[80vh] flex flex-col overflow-hidden fade-in">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">隐私政策</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 text-xs text-slate-600 leading-relaxed space-y-3 hide-scrollbar">
          <p className="font-bold text-sm">1. 信息收集范围</p>
          <p>我们收集的信息包括：手机号码（用于身份验证）、真实姓名（用于实名认证）、位置信息（用于风险定位）、设备信息（用于服务优化）、举报内容（含照片、视频、文字描述）。</p>
          <p className="font-bold text-sm">2. 信息使用目的</p>
          <p>我们使用您的信息用于：提供校园低空安全预警服务、处理举报工单、进行安全态势分析、发送风险提醒、统计用户贡献、优化平台功能。</p>
          <p className="font-bold text-sm">3. 信息共享</p>
          <p>您的举报信息将共享至校园保卫处及相关管理部门，用于安全事件处置。我们不会将您的个人信息出售给任何第三方。</p>
          <p className="font-bold text-sm">4. 信息安全</p>
          <p>我们采用加密技术保护您的数据传输和存储安全。您的密码和敏感信息经过加密处理，即使平台管理员也无法直接查看。</p>
          <p className="font-bold text-sm">5. 用户权利</p>
          <p>您有权查阅、更正、删除您的个人信息，有权撤回授权同意，有权注销账号。如需行使上述权利，请联系平台管理员。</p>
        </div>
        <div className="p-4 border-t border-slate-100">
          <button onClick={onClose} className="w-full bg-gradient-green text-white font-bold py-3 rounded-xl active:scale-95 transition">
            我已阅读
          </button>
        </div>
      </div>
    </div>
  )
}

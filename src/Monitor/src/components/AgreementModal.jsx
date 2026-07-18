export default function AgreementModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm max-h-[80vh] flex flex-col overflow-hidden fade-in">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">用户服务协议</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 text-xs text-slate-600 leading-relaxed space-y-3 hide-scrollbar">
          <p className="font-bold text-sm">1. 服务说明</p>
          <p>校园低空安全卫士平台（以下简称"本平台"）由苏州职业技术大学提供，旨在通过公众参与机制，实现校园低空空域风险的实时监测、预警与协同防控。</p>
          <p className="font-bold text-sm">2. 用户责任</p>
          <p>用户承诺提供的身份信息真实、准确、完整。用户通过本平台提交的举报信息应当客观真实，不得捏造、歪曲事实，不得诬告陷害他人。</p>
          <p className="font-bold text-sm">3. 信息使用</p>
          <p>用户授权本平台获取并使用其手机号码、位置信息、设备信息，用于身份验证、风险定位、积分统计及安全预警服务。本平台承诺对用户的个人信息严格保密，未经用户同意不向第三方披露。</p>
          <p className="font-bold text-sm">4. 积分规则</p>
          <p>用户通过有效举报、学习安全知识、参与志愿巡查等行为获得信用积分。积分可用于兑换校园服务或作为评优参考依据。</p>
          <p className="font-bold text-sm">5. 违规处理</p>
          <p>对于恶意举报、虚假上报、滥用平台功能等行为，平台有权扣除积分、限制功能直至注销账号，并保留追究法律责任的权利。</p>
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

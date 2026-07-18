import { useState, useRef } from 'react'
import AuthHeader from './AuthHeader'
import { createUser } from '../utils/createUser'

const ROLE_CONFIG = [
  { key: 'student', label: '在校学生', icon: 'fa-user-graduate' },
  { key: 'teacher', label: '教职工',   icon: 'fa-chalkboard-teacher' },
  { key: 'staff',   label: '其他人员', icon: 'fa-briefcase' },
]

export default function RegisterPage({ onLogin, onGoLogin, onShowAgreement, onShowPrivacy, showToast }) {
  const [phone, setPhone]         = useState('')
  const [code, setCode]           = useState('')
  const [name, setName]           = useState('')
  const [role, setRole]           = useState('')
  const [userId, setUserId]       = useState('')
  const [dept, setDept]           = useState('')
  const [agreement, setAgreement] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [countdown, setCountdown] = useState(0)
  const timer = useRef(null)

  const startCountdown = () => {
    let seconds = 60
    setCountdown(seconds)
    timer.current = setInterval(() => {
      seconds--
      if (seconds <= 0) { clearInterval(timer.current); setCountdown(0) }
      else setCountdown(seconds)
    }, 1000)
  }

  const sendCode = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) { showToast('请先输入正确的手机号'); return }
    startCountdown()
    showToast('验证码已发送：123456（演示码）')
    setTimeout(() => setCode('123456'), 500)
  }

  const handleRegister = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) { showToast('请输入正确的手机号'); return }
    if (!/^\d{4,6}$/.test(code))       { showToast('请输入正确的验证码'); return }
    if (!name.trim())                  { showToast('请输入真实姓名'); return }
    if (!role)                         { showToast('请选择身份类型'); return }
    if (!agreement)                    { showToast('请阅读并同意用户协议和隐私政策'); return }

    setLoading(true)
    setTimeout(() => {
      const user = createUser(phone, name.trim(), role, userId.trim(), dept.trim())
      setLoading(false)
      showToast('注册成功！欢迎加入校园低空安全卫士平台')
      onLogin(user)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-[100] login-bg flex flex-col overflow-y-auto hide-scrollbar">
      <AuthHeader />

      <div className="flex-1 px-6 py-8 space-y-6 max-w-md mx-auto w-full">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-800">注册账号</h2>
          <p className="text-sm text-slate-500">完善信息，开启校园空域守护</p>
        </div>

        <div className="space-y-4">
          {/* 手机号 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              手机号码 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fas fa-mobile-alt" />
              </div>
              <input
                type="tel" maxLength={11} placeholder="请输入11位手机号"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm input-focus-ring transition"
              />
            </div>
          </div>

          {/* 验证码 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              验证码 <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-3">
              <input
                type="text" maxLength={6} placeholder="请输入验证码"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm input-focus-ring transition"
              />
              <button
                onClick={sendCode}
                disabled={countdown > 0}
                className="bg-white border border-emerald-500 text-emerald-600 font-medium px-4 py-3 rounded-xl text-sm whitespace-nowrap active:bg-emerald-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
          </div>

          {/* 真实姓名 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              真实姓名 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fas fa-user" />
              </div>
              <input
                type="text" placeholder="请输入真实姓名"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm input-focus-ring transition"
              />
            </div>
          </div>

          {/* 身份类型 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              身份类型 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {ROLE_CONFIG.map(r => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  className={`border-2 rounded-xl py-3 text-sm active:scale-95 transition flex flex-col items-center ${
                    role === r.key
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <i className={`fas ${r.icon} text-lg mb-1 ${role === r.key ? 'text-emerald-500' : 'text-slate-400'}`} />
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* 学号/工号 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">学号 / 工号</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fas fa-id-card" />
              </div>
              <input
                type="text" placeholder="请输入学号或工号（选填）"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm input-focus-ring transition"
              />
            </div>
          </div>

          {/* 所属学院/部门 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">所属学院 / 部门</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fas fa-building" />
              </div>
              <input
                type="text" placeholder="例如：电子信息工程学院"
                value={dept}
                onChange={e => setDept(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm input-focus-ring transition"
              />
            </div>
          </div>
        </div>

        {/* 注册协议 */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox" id="reg-agreement" checked={agreement}
            onChange={e => setAgreement(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
          <label htmlFor="reg-agreement" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
            我已阅读并同意
            <span className="text-emerald-600 cursor-pointer" onClick={e => { e.preventDefault(); onShowAgreement() }}>《用户服务协议》</span>
            和
            <span className="text-emerald-600 cursor-pointer" onClick={e => { e.preventDefault(); onShowPrivacy() }}>《隐私政策》</span>
          </label>
        </div>

        {/* 注册按钮 */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-gradient-green text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 active:scale-[0.98] transition-transform text-base disabled:opacity-70"
        >
          {loading ? <><i className="fas fa-spinner fa-spin mr-2" />注册中...</> : '注册并登录'}
        </button>

        {/* 跳转登录 */}
        <div className="text-center">
          <span className="text-sm text-slate-500">已有账号？</span>
          <button onClick={onGoLogin} className="text-sm font-bold text-emerald-600 ml-1">直接登录</button>
        </div>
      </div>
    </div>
  )
}

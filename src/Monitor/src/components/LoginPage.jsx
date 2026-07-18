import { useState, useRef } from 'react'
import AuthHeader from './AuthHeader'
import { createUser } from '../utils/createUser'

export default function LoginPage({ onLogin, onGoRegister, onShowAgreement, onShowPrivacy, showToast }) {
  const [phone, setPhone]           = useState('')
  const [code, setCode]             = useState('')
  const [agreement, setAgreement]   = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [loading, setLoading]       = useState(false)
  const [countdown, setCountdown]   = useState(0)
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

  const handleLogin = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setPhoneError(true)
      setTimeout(() => setPhoneError(false), 2000)
      return
    }
    if (!/^\d{4,6}$/.test(code)) { showToast('请输入正确的验证码'); return }
    if (!agreement) { showToast('请阅读并同意用户协议和隐私政策'); return }
    setLoading(true)
    setTimeout(() => {
      const stored = localStorage.getItem('campus_uav_user')
      let user
      if (stored) {
        const parsed = JSON.parse(stored)
        user = parsed.phone === phone
          ? parsed
          : createUser(phone, phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'), 'student', '', '')
      } else {
        user = createUser(phone, phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'), 'student', '', '')
      }
      setLoading(false)
      showToast('登录成功！欢迎回来')
      onLogin(user)
    }, 1500)
  }

  const quickLogin = (name, p, role) => {
    const user = createUser(p, name, role, '2023' + Math.floor(Math.random() * 10000), '电子信息工程学院')
    showToast(`欢迎 ${name}，快速登录成功`)
    onLogin(user)
  }

  return (
    <div className="fixed inset-0 z-[100] login-bg flex flex-col overflow-y-auto hide-scrollbar">
      <AuthHeader />

      <div className="flex-1 px-6 py-8 space-y-6 max-w-md mx-auto w-full">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-800">欢迎登录</h2>
          <p className="text-sm text-slate-500">请使用手机号验证登录</p>
        </div>

        <div className="space-y-4">
          {/* 手机号 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">手机号码</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fas fa-mobile-alt" />
              </div>
              <input
                type="tel" maxLength={11} placeholder="请输入11位手机号"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                className={`w-full bg-white border rounded-xl pl-11 pr-4 py-3.5 text-sm input-focus-ring transition ${
                  phoneError ? 'border-red-300 shake' : 'border-slate-200'
                }`}
              />
            </div>
            {phoneError && (
              <p className="text-xs text-red-500 mt-1">
                <i className="fas fa-exclamation-circle mr-1" />请输入正确的手机号
              </p>
            )}
          </div>

          {/* 验证码 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">验证码</label>
            <div className="flex space-x-3">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <i className="fas fa-shield-alt" />
                </div>
                <input
                  type="text" maxLength={6} placeholder="请输入验证码"
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm input-focus-ring transition"
                />
              </div>
              <button
                onClick={sendCode}
                disabled={countdown > 0}
                className="bg-white border border-emerald-500 text-emerald-600 font-medium px-4 py-3 rounded-xl text-sm whitespace-nowrap active:bg-emerald-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
          </div>
        </div>

        {/* 用户协议 */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox" id="login-agreement" checked={agreement}
            onChange={e => setAgreement(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
          <label htmlFor="login-agreement" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
            我已阅读并同意
            <span className="text-emerald-600 cursor-pointer" onClick={e => { e.preventDefault(); onShowAgreement() }}>《用户服务协议》</span>
            和
            <span className="text-emerald-600 cursor-pointer" onClick={e => { e.preventDefault(); onShowPrivacy() }}>《隐私政策》</span>
            ，授权获取手机号及位置信息用于校园空域安全预警服务。
          </label>
        </div>

        {/* 登录按钮 */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-green text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 active:scale-[0.98] transition-transform text-base disabled:opacity-70"
        >
          {loading ? <><i className="fas fa-spinner fa-spin mr-2" />登录中...</> : '登录'}
        </button>

        {/* 跳转注册 */}
        <div className="text-center">
          <span className="text-sm text-slate-500">还没有账号？</span>
          <button onClick={onGoRegister} className="text-sm font-bold text-emerald-600 ml-1">立即注册</button>
        </div>

        {/* 快速体验 */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center mb-3">快速体验（无需验证）</p>
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => quickLogin('张同学', '13800138000', 'student')}
              className="bg-white border border-slate-200 rounded-xl py-2 text-xs text-slate-600 active:bg-slate-50 transition">
              <i className="fas fa-user-graduate text-emerald-500 mb-1 block text-lg" />学生体验
            </button>
            <button onClick={() => quickLogin('李老师', '13900139000', 'teacher')}
              className="bg-white border border-slate-200 rounded-xl py-2 text-xs text-slate-600 active:bg-slate-50 transition">
              <i className="fas fa-chalkboard-teacher text-blue-500 mb-1 block text-lg" />教师体验
            </button>
            <button onClick={() => quickLogin('王安保', '13700137000', 'security')}
              className="bg-white border border-slate-200 rounded-xl py-2 text-xs text-slate-600 active:bg-slate-50 transition">
              <i className="fas fa-user-shield text-orange-500 mb-1 block text-lg" />安保体验
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

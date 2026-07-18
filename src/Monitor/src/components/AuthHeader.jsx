/** 登录/注册页面共用的绿色顶部品牌区 */
export default function AuthHeader() {
  return (
    <div className="h-48 bg-gradient-green relative overflow-hidden shrink-0">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-white px-6">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-4 border border-white/30">
          <i className="fas fa-shield-alt text-3xl" />
        </div>
        <h1 className="text-2xl font-bold mb-1">校园低空安全卫士平台</h1>
        <p className="text-sm opacity-90">守护校园空域安全，人人有责</p>
      </div>
    </div>
  )
}

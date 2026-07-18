import { useState } from 'react'
import PageHeader from './PageHeader'

export default function ProfileEditPage({ currentUser, onClose, onSave, showToast }) {
  const [name, setName]   = useState(currentUser?.name || '')
  const [dept, setDept]   = useState(currentUser?.dept || '')
  const [userId, setUserId] = useState(currentUser?.userId || '')

  const handleSave = () => {
    if (!name.trim()) { showToast('姓名不能为空'); return }
    onSave({ ...currentUser, name: name.trim(), dept: dept.trim(), userId: userId.trim() })
  }

  return (
    <div className="fixed inset-0 bg-[#f0fdf4] z-[70] flex flex-col slide-up page-container overflow-y-auto hide-scrollbar">
      <PageHeader
        onBack={onClose}
        title="修改资料"
        rightLabel="保存"
        onRightClick={handleSave}
      />

      <main className="px-4 py-4 max-w-md mx-auto space-y-4 pb-6">
        <section className="bg-white rounded-2xl card-shadow p-4 space-y-4">
          {/* 头像 */}
          <div className="flex flex-col items-center py-4">
            <div className="w-20 h-20 bg-gradient-green rounded-full flex items-center justify-center text-white text-3xl font-bold mb-2 relative">
              {name.charAt(0) || '用'}
            </div>
            <p className="text-xs text-slate-400">头像显示姓名首字</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">真实姓名</label>
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm input-focus-ring transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">手机号码</label>
            <input
              type="tel" value={currentUser?.phone || ''} disabled
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500"
            />
            <p className="text-xs text-slate-400 mt-1">手机号不可修改</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">所属学院 / 部门</label>
            <input
              type="text" value={dept} onChange={e => setDept(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm input-focus-ring transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">学号 / 工号</label>
            <input
              type="text" value={userId} onChange={e => setUserId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm input-focus-ring transition"
            />
          </div>
        </section>
      </main>
    </div>
  )
}

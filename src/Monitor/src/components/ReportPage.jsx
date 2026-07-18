import { useState, useRef } from 'react'
import PageHeader from './PageHeader'

const BEHAVIORS = [
  { icon: 'fa-dot-circle', label: '悬停拍摄' },
  { icon: 'fa-sync',       label: '低空盘旋' },
  { icon: 'fa-bolt',       label: '快速穿越' },
  { icon: 'fa-building',   label: '接近建筑物' },
  { icon: 'fa-ellipsis-h', label: '其它' },
]

export default function ReportPage({ currentUser, onClose, onSubmitSuccess, showToast }) {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [previewLabel, setPreviewLabel] = useState('')
  const [showAI, setShowAI] = useState(false)
  const [selectedBehaviors, setSelectedBehaviors] = useState([])
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const capturedFiles = useRef([])
  const prevUrl = useRef(null)

  const showPreview = (file, type) => {
    if (prevUrl.current) URL.revokeObjectURL(prevUrl.current)
    const url = URL.createObjectURL(file)
    prevUrl.current = url
    setPreviewUrl(url)
    setPreviewLabel(type === 'video' ? '已录制视频' : '已识别 DJI Mini 3')
    setTimeout(() => setShowAI(true), 800)
    showToast(`已${type === 'video' ? '录制' : '拍摄'}: ${file.name}`)
  }

  const handleFileCapture = (input, type) => {
    const file = input.files[0]
    if (!file) return
    capturedFiles.current.push({ type, file })
    showPreview(file, type)
    input.value = ''
  }

  const handleAlbumSelect = (input) => {
    const files = Array.from(input.files)
    if (!files.length) return
    files.forEach(f => capturedFiles.current.push({ type: f.type.startsWith('video/') ? 'video' : 'photo', file: f }))
    showPreview(files[0], files[0].type.startsWith('video/') ? 'video' : 'photo')
    input.value = ''
  }

  const removePhoto = () => {
    if (prevUrl.current) { URL.revokeObjectURL(prevUrl.current); prevUrl.current = null }
    setPreviewUrl(null)
    setShowAI(false)
    capturedFiles.current = []
  }

  const toggleBehavior = (label) => {
    setSelectedBehaviors(prev =>
      prev.includes(label) ? prev.filter(b => b !== label) : [...prev, label]
    )
  }

  const submitReport = () => {
    if (!capturedFiles.current.length) { showToast('请先拍摄或上传证据照片'); return }
    setSubmitting(true)
    setTimeout(() => {
      const updated = currentUser
        ? { ...currentUser, reports: (currentUser.reports || 0) + 1, score: (currentUser.score || 0) + 10 }
        : currentUser
      setSubmitting(false)
      showToast('举报成功！案件编号：CASE-2026-0317-002\nAI评估：高风险事件，已自动通知保卫处。\n获得 +10 信用积分！')
      onSubmitSuccess(updated)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-[#f0fdf4] z-[60] flex flex-col slide-up page-container overflow-y-auto hide-scrollbar">
      <PageHeader
        onBack={onClose}
        title="快速举报"
        subtitle="实时上报"
        rightIcon="fa-question-circle"
        onRightClick={() => showToast('拍照提示：\n1. 确保飞行器清晰可见\n2. 包含周围环境参考\n3. 保持安全距离')}
      />

      <main className="px-4 py-4 max-w-md mx-auto space-y-4 pb-32">
        {/* 上报须知 */}
        <section className="bg-emerald-50 rounded-2xl card-shadow p-4 border border-emerald-100">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
              <i className="fas fa-info text-sm" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-800 mb-1">上报须知</h3>
              <p className="text-xs text-emerald-600 leading-relaxed">请确保自身安全，保持安全距离拍摄。系统将自动识别无人机型号并评估风险等级。</p>
            </div>
          </div>
        </section>

        {/* 拍摄证据 */}
        <section className="bg-white rounded-2xl card-shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-700">拍摄证据</h2>
            <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full font-medium">必填</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { icon: 'fa-camera', label: '拍照', accept: 'image/*', capture: 'environment', type: 'photo' },
              { icon: 'fa-video',  label: '录像', accept: 'video/*', capture: 'environment', type: 'video' },
              { icon: 'fa-images', label: '相册', accept: 'image/*,video/*', capture: undefined, type: 'album' },
            ].map(btn => (
              <label key={btn.label} className="aspect-square bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-600 active:bg-emerald-50 active:border-emerald-400 active:text-emerald-600 transition touch-feedback relative cursor-pointer">
                <i className={`fas ${btn.icon} text-2xl mb-2`} />
                <span className="text-xs font-medium">{btn.label}</span>
                <input
                  type="file"
                  accept={btn.accept}
                  capture={btn.capture}
                  multiple={btn.type === 'album'}
                  className="file-input-hidden"
                  onChange={e => btn.type === 'album' ? handleAlbumSelect(e.target) : handleFileCapture(e.target, btn.type)}
                />
              </label>
            ))}
          </div>

          {/* 预览区 */}
          {previewUrl && (
            <div className="relative rounded-xl overflow-hidden bg-slate-900 mb-3 fade-in">
              <img src={previewUrl} className="w-full h-48 object-cover opacity-90" alt="preview" />
              <button onClick={removePhoto} className="absolute top-3 left-3 w-10 h-10 bg-red-500/90 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition">
                <i className="fas fa-trash-alt text-sm" />
              </button>
              <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center">
                <i className="fas fa-check-circle text-emerald-400 mr-1.5" />
                {previewLabel}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between text-white text-xs">
                  <span><i className="far fa-clock mr-1" />刚刚拍摄</span>
                  <span><i className="fas fa-map-marker-alt mr-1" />距离 45米</span>
                </div>
              </div>
            </div>
          )}

          {/* AI结果 */}
          {showAI && (
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 text-white fade-in">
              <div className="flex items-center space-x-2 mb-3">
                <i className="fas fa-robot text-lg" />
                <span className="font-bold text-sm">AI 智能分析</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { emoji: '⚠️', main: '高风险', sub: '靠近敏感区' },
                  { emoji: '🚫', main: '未申报', sub: '系统无记录' },
                  { emoji: '✓',  main: '已识别', sub: 'DJI Mini 3' },
                ].map(item => (
                  <div key={item.main} className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                    <div className="text-lg font-bold mb-0.5">{item.emoji}</div>
                    <div className="text-[10px] opacity-90">{item.main}</div>
                    <div className="text-[9px] opacity-75">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 事发位置 */}
        <section className="bg-white rounded-2xl card-shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-700">事发位置</h2>
            <button onClick={() => showToast('位置已更新: 苏州职业技术大学 - 惠和楼附近')}
              className="text-xs text-emerald-600 font-medium flex items-center active:scale-95 transition">
              <i className="fas fa-sync-alt mr-1" />刷新
            </button>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100 mb-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
              <i className="fas fa-map-marker-alt" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-800 text-sm mb-0.5">苏州职业技术大学</div>
              <div className="text-xs text-slate-500 truncate">惠和楼附近 • 距离您 45米</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">31.2345° N, 120.4567° E</div>
            </div>
          </div>
          <div className="h-32 bg-slate-100 rounded-xl relative overflow-hidden border border-slate-200">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
              <i className="fas fa-map-marked-alt mr-2" />地图位置预览
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg relative z-10" />
                <div className="absolute -inset-2 bg-emerald-400/30 rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </section>

        {/* 飞行行为 */}
        <section className="bg-white rounded-2xl card-shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-700">飞行行为</h2>
            <span className="text-xs text-slate-400">可多选</span>
          </div>
          <div className="space-y-2">
            {BEHAVIORS.map(b => {
              const selected = selectedBehaviors.includes(b.label)
              return (
                <button
                  key={b.label}
                  onClick={() => toggleBehavior(b.label)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition touch-feedback ${selected ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm">
                      <i className={`fas ${b.icon} text-xs`} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{b.label}</span>
                  </div>
                  <i className={`fas fa-check-circle text-lg ${selected ? 'text-emerald-500' : 'text-slate-300'}`} />
                </button>
              )
            })}
          </div>
        </section>

        {/* 补充描述 */}
        <section className="bg-white rounded-2xl card-shadow p-4">
          <h2 className="text-sm font-bold text-slate-700 mb-3">补充描述</h2>
          <div className="relative">
            <textarea
              rows={4}
              maxLength={200}
              placeholder="请描述飞行器颜色、大小、飞行高度等特征..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition resize-none"
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
              {description.length}/200
            </div>
          </div>
        </section>

        <section className="flex items-center space-x-2 text-xs text-slate-500 px-1">
          <i className="fas fa-shield-alt text-emerald-500" />
          <span>举报信息将加密传输至校园保卫处</span>
        </section>
      </main>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 safe-bottom z-50 shadow-lg">
        <div className="max-w-md mx-auto flex space-x-3">
          <button onClick={() => { showToast('已保存到草稿箱'); onClose() }}
            className="flex-1 bg-slate-100 text-slate-700 font-bold py-3.5 rounded-xl active:bg-slate-200 transition text-sm">
            存草稿
          </button>
          <button onClick={submitReport} disabled={submitting}
            className="flex-[2] bg-gradient-green text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-200 active:scale-[0.98] transition-transform flex items-center justify-center space-x-2 disabled:opacity-70">
            {submitting
              ? <><i className="fas fa-spinner fa-spin" /><span>提交中...</span></>
              : <><i className="fas fa-paper-plane" /><span>立即上报</span></>}
          </button>
        </div>
      </div>
    </div>
  )
}

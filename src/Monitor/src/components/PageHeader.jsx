/**
 * 子页面通用顶部导航栏
 *
 * Props:
 *   onBack       - 返回按钮点击回调（必填）
 *   title        - 主标题（必填）
 *   subtitle     - 副标题，显示绿色呼吸点（可选）
 *   rightIcon    - Font Awesome 图标类名，如 'fa-cog'（可选）
 *   rightLabel   - 文字按钮，如 '保存'（与 rightIcon 二选一）
 *   onRightClick - 右侧按钮点击回调（可选）
 */
export default function PageHeader({ onBack, title, subtitle, rightIcon, rightLabel, onRightClick }) {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-emerald-100 z-50 px-4 py-3 safe-top">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* 左侧：返回 + 标题 */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center text-slate-600 active:scale-95 transition rounded-full hover:bg-slate-100"
          >
            <i className="fas fa-chevron-left text-lg" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-tight">{title}</h1>
            {subtitle && (
              <div className="flex items-center space-x-1 text-xs text-emerald-600">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full status-breathe" />
                <span>{subtitle}</span>
              </div>
            )}
          </div>
        </div>

        {/* 右侧：可选操作按钮 */}
        {(rightIcon || rightLabel) && (
          <button
            onClick={onRightClick}
            className={
              rightLabel
                ? 'text-sm font-bold text-emerald-600'
                : 'w-8 h-8 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition rounded-full hover:bg-slate-100'
            }
          >
            {rightLabel ? rightLabel : <i className={`fas ${rightIcon} text-lg`} />}
          </button>
        )}
      </div>
    </header>
  )
}

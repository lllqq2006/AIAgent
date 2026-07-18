import { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import MainLayout from './components/MainLayout'
import ProfilePage from './components/ProfilePage'
import ProfileEditPage from './components/ProfileEditPage'
import AboutPage from './components/AboutPage'
import ReportPage from './components/ReportPage'
import TrackingPage from './components/TrackingPage'
import EducationPage from './components/EducationPage'
import AgreementModal from './components/AgreementModal'
import PrivacyModal from './components/PrivacyModal'
import Toast from './components/Toast'

const AUTH_KEY = 'campus_uav_auth'
const USER_KEY = 'campus_uav_user'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  // authView: 'login' | 'register'
  const [authView, setAuthView] = useState('login')
  // overlay: null | 'profile' | 'profileEdit' | 'about' | 'report' | 'tracking' | 'education'
  const [overlay, setOverlay] = useState(null)
  const [showAgreement, setShowAgreement] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY)
    const user = localStorage.getItem(USER_KEY)
    if (auth && user) {
      setCurrentUser(JSON.parse(user))
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const showToast = (message) => {
    setToastMsg(message)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleLogin = (user) => {
    localStorage.setItem(AUTH_KEY, 'token_' + Date.now())
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    setCurrentUser(user)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    if (!window.confirm('确定要退出登录吗？')) return
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(USER_KEY)
    setCurrentUser(null)
    setIsAuthenticated(false)
    setOverlay(null)
    showToast('已退出登录')
  }

  const updateUser = (updatedUser) => {
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)
  }

  if (isLoading) return null

  return (
    <div className="text-slate-800 antialiased">
      {!isAuthenticated && authView === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onGoRegister={() => setAuthView('register')}
          onShowAgreement={() => setShowAgreement(true)}
          onShowPrivacy={() => setShowPrivacy(true)}
          showToast={showToast}
        />
      )}

      {!isAuthenticated && authView === 'register' && (
        <RegisterPage
          onLogin={handleLogin}
          onGoLogin={() => setAuthView('login')}
          onShowAgreement={() => setShowAgreement(true)}
          onShowPrivacy={() => setShowPrivacy(true)}
          showToast={showToast}
        />
      )}
      {isAuthenticated && (
        <>
          <MainLayout
            currentUser={currentUser}
            onNavigate={setOverlay}
            showToast={showToast}
          />

          {overlay === 'profile' && (
            <ProfilePage
              currentUser={currentUser}
              onClose={() => setOverlay(null)}
              onNavigate={setOverlay}
              onLogout={handleLogout}
              onShowAgreement={() => setShowAgreement(true)}
              onShowPrivacy={() => setShowPrivacy(true)}
              showToast={showToast}
            />
          )}

          {overlay === 'profileEdit' && (
            <ProfileEditPage
              currentUser={currentUser}
              onClose={() => setOverlay('profile')}
              onSave={(updated) => {
                updateUser(updated)
                setOverlay('profile')
                showToast('资料更新成功')
              }}
              showToast={showToast}
            />
          )}

          {overlay === 'about' && (
            <AboutPage onClose={() => setOverlay('profile')} />
          )}

          {overlay === 'report' && (
            <ReportPage
              currentUser={currentUser}
              onClose={() => setOverlay(null)}
              onSubmitSuccess={(updated) => {
                updateUser(updated)
                setOverlay(null)
              }}
              showToast={showToast}
            />
          )}

          {overlay === 'tracking' && (
            <TrackingPage
              onClose={() => setOverlay(null)}
              showToast={showToast}
            />
          )}

          {overlay === 'education' && (
            <EducationPage
              onClose={() => setOverlay(null)}
              showToast={showToast}
            />
          )}
        </>
      )}

      {showAgreement && (
        <AgreementModal onClose={() => setShowAgreement(false)} />
      )}

      {showPrivacy && (
        <PrivacyModal onClose={() => setShowPrivacy(false)} />
      )}

      {toastMsg && <Toast message={toastMsg} />}
    </div>
  )
}

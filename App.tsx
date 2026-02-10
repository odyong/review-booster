
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Star, LayoutDashboard, Settings, ShieldCheck, FileText, Undo2, LogOut, LogIn } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Rate from './pages/Rate';
import ProfilePage from './pages/Profile';
import Auth from './pages/Auth';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const isPublicRatePage = location.pathname.startsWith('/rate/');

  // Mock session check - in a real app, this would use supabase.auth.onAuthStateChange
  useEffect(() => {
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mock_user');
    setUser(null);
    window.location.hash = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!isPublicRatePage && (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">ReviewBoost</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              {user ? (
                <>
                  <Link to="/" className="hover:text-indigo-600 flex items-center gap-1.5">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link to="/profile" className="hover:text-indigo-600 flex items-center gap-1.5">
                    <Settings className="w-4 h-4" /> Profile
                  </Link>
                  <button onClick={handleLogout} className="text-red-500 hover:text-red-600 flex items-center gap-1.5">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Sign In
                </Link>
              )}
            </nav>

            <div className="md:hidden">
              {/* Mobile Menu Trigger would go here */}
            </div>
          </div>
        </header>
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={user ? <Dashboard user={user} /> : <Auth onAuthSuccess={setUser} />} />
          <Route path="/login" element={<Auth onAuthSuccess={setUser} />} />
          <Route path="/profile" element={user ? <ProfilePage user={user} /> : <Auth onAuthSuccess={setUser} />} />
          <Route path="/rate/:id" element={<Rate />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
        </Routes>
      </main>

      {!isPublicRatePage && (
        <footer className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-indigo-600 fill-indigo-600" />
                  <span className="font-bold text-lg tracking-tight">ReviewBoost</span>
                </div>
                <p className="text-slate-500 text-sm">
                  Helping businesses get more 5-star reviews while catching negative feedback early.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><Link to="/terms" className="hover:text-indigo-600">Terms of Service</Link></li>
                  <li><Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link></li>
                  <li><Link to="/refund" className="hover:text-indigo-600">Refund Policy</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
                <p className="text-sm text-slate-500">Need help? Email us at support@reviewboost.io</p>
                <p className="mt-2 text-xs text-slate-400">© 2024 ReviewBoost. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
import { Save, ExternalLink, Shield, Info, CheckCircle } from 'lucide-react';
import { Profile } from '../types';

const ProfilePage: React.FC<{ user: any }> = ({ user }) => {
  const [profile, setProfile] = useState<Profile>({
    id: user.id,
    business_name: '',
    google_review_url: '',
    paddle_sub_status: 'inactive'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`profile_${user.id}`);
    if (stored) setProfile(JSON.parse(stored));
  }, [user.id]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));
    
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Configure your business details and review destination.</p>
      </div>

      <div className="space-y-6">
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600" />
              Business Configuration
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Business Display Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={profile.business_name}
                  onChange={(e) => setProfile({ ...profile, business_name: e.target.value })}
                  placeholder="e.g. Acme Coffee Roasters"
                />
                <p className="mt-1.5 text-xs text-slate-400">This is shown to customers in the SMS/WhatsApp messages.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Google Review Link</label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={profile.google_review_url}
                    onChange={(e) => setProfile({ ...profile, google_review_url: e.target.value })}
                    placeholder="https://search.google.com/local/writereview?placeid=..."
                  />
                  {profile.google_review_url && (
                    <a 
                      href={profile.google_review_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <div className="mt-2 p-3 bg-indigo-50 rounded-lg flex gap-3 text-xs text-indigo-700 leading-relaxed">
                  <Info className="w-4 h-4 shrink-0" />
                  <p>
                    Tip: Go to your Google Business Profile &gt; Reviews &gt; Get more reviews &gt; Copy link. 
                    This is where customers who rate you 4 or 5 stars will be sent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {showSuccess && (
                <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Saved successfully
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2 disabled:bg-slate-300"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
              <Save className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Subscription Status</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 capitalize">{profile.paddle_sub_status}</p>
                <p className="text-sm text-slate-500">Billed monthly via Paddle</p>
              </div>
            </div>
            <button className="text-sm text-indigo-600 font-semibold hover:underline">Manage Billing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


import React, { useState, useEffect } from 'react';
import { Share2, Mail, Send, Copy, CheckCircle, RefreshCw, Star } from 'lucide-react';
import { FeedbackRequest, Profile } from '../types';

interface DashboardProps {
  user: { id: string; email: string };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [customerName, setCustomerName] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [requests, setRequests] = useState<FeedbackRequest[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [latestLink, setLatestLink] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Load profile and mock requests from localStorage for demo purposes
    const storedProfile = localStorage.getItem(`profile_${user.id}`);
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      const defaultProfile: Profile = {
        id: user.id,
        business_name: "The Coffee Bean",
        google_review_url: "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4",
        paddle_sub_status: "active"
      };
      setProfile(defaultProfile);
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(defaultProfile));
    }

    const storedRequests = localStorage.getItem(`requests_${user.id}`);
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }
  }, [user.id]);

  const generateLink = async () => {
    if (!customerName) return;
    setIsGenerating(true);

    const newRequestId = crypto.randomUUID();
    const newRequest: FeedbackRequest = {
      id: newRequestId,
      user_id: user.id,
      customer_name: customerName,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);
    localStorage.setItem(`requests_${user.id}`, JSON.stringify(updatedRequests));

    const baseUrl = window.location.origin + window.location.pathname;
    const shareableUrl = `${baseUrl}#/rate/${newRequestId}`;
    setLatestLink(shareableUrl);
    setIsGenerating(false);
  };

  const getEmailLink = () => {
    if (!latestLink || !profile) return '#';
    const subject = `How was your visit to ${profile.business_name}?`;
    const body = `Hi ${customerName},\n\nThank you for choosing ${profile.business_name}! We'd love to hear about your experience. Could you spare a moment to leave us a quick review?\n\nYou can rate us here: ${latestLink}\n\nBest regards,\nThe team at ${profile.business_name}`;
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getWhatsAppLink = () => {
    if (!latestLink || !profile) return '#';
    const msg = `Hi ${customerName}, thanks for visiting ${profile.business_name}! Could you leave us a review? ${latestLink}`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };

  const handleCopy = () => {
    if (latestLink) {
      navigator.clipboard.writeText(latestLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <h1 className="text-2xl font-bold mb-2">Create New Review Request</h1>
          <p className="text-indigo-100 opacity-90">Enter your customer's name to generate their unique magic link.</p>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <label htmlFor="customer" className="block text-sm font-medium text-slate-700 mb-1.5">Customer Name</label>
              <input
                type="text"
                id="customer"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={generateLink}
                disabled={!customerName || isGenerating}
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-8 py-2.5 rounded-xl font-semibold transition flex items-center justify-center gap-2"
              >
                {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                Generate Link
              </button>
            </div>
          </div>

          {latestLink && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-900">Generated Link for {customerName}</span>
                <button 
                  onClick={handleCopy}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                >
                  {copySuccess ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copySuccess ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-600 truncate mb-6 select-all font-mono">
                {latestLink}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={getEmailLink()}
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition shadow-sm"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition shadow-sm"
                >
                  <Share2 className="w-5 h-5" />
                  Send WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-lg text-slate-900">Recent Requests</h2>
          <button 
            onClick={() => window.location.reload()}
            className="text-slate-400 hover:text-indigo-600"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">No requests generated yet.</td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-medium text-slate-900">{req.customer_name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        req.status === 'rated' ? 'bg-emerald-100 text-emerald-800' :
                        req.status === 'clicked' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {req.rating ? (
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < (req.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                            />
                          ))}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm text-right">
                      {new Date(req.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

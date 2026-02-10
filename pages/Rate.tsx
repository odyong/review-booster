
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MessageSquare, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { FeedbackRequest, Profile } from '../types';

const Rate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<FeedbackRequest | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState<'rate' | 'feedback' | 'success'>('rate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulation of Supabase fetching
      // Find the request in localStorage across all users for demo
      let foundRequest: FeedbackRequest | null = null;
      let foundProfile: Profile | null = null;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('requests_')) {
          const reqs = JSON.parse(localStorage.getItem(key) || '[]');
          const req = reqs.find((r: FeedbackRequest) => r.id === id);
          if (req) {
            foundRequest = req;
            const userId = key.split('_')[1];
            foundProfile = JSON.parse(localStorage.getItem(`profile_${userId}`) || '{}');
            break;
          }
        }
      }

      if (foundRequest && foundProfile) {
        setRequest(foundRequest);
        setProfile(foundProfile);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const updateRequest = (updates: Partial<FeedbackRequest>) => {
    // Helper to update our "mock DB"
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('requests_')) {
        const reqs = JSON.parse(localStorage.getItem(key) || '[]');
        const updatedReqs = reqs.map((r: FeedbackRequest) => r.id === id ? { ...r, ...updates } : r);
        localStorage.setItem(key, JSON.stringify(updatedReqs));
      }
    }
  };

  const handleRating = async (r: number) => {
    setRating(r);
    setIsSubmitting(true);
    
    updateRequest({ status: 'rated', rating: r });

    setTimeout(() => {
      setIsSubmitting(false);
      if (r >= 4) {
        // High rating: Redirect to Google
        window.location.href = profile?.google_review_url || '/';
      } else {
        // Low rating: Capture feedback
        setStep('feedback');
      }
    }, 600);
  };

  const handleFeedbackSubmit = async () => {
    setIsSubmitting(true);
    updateRequest({ feedback_text: feedback });
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!request || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Invalid Review Link</h1>
          <p className="text-slate-500">This link is either expired or incorrect.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 text-center border border-slate-100">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Star className="w-10 h-10 text-indigo-600 fill-indigo-600" />
        </div>

        {step === 'rate' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Hello, {request.customer_name}!</h1>
            <p className="text-slate-500 mb-8">How was your recent experience with <span className="font-semibold text-slate-800">{profile.business_name}</span>?</p>
            
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => handleRating(star)}
                  disabled={isSubmitting}
                  className="transition-transform active:scale-90"
                >
                  <Star 
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${
                      (hoveredRating || rating) >= star 
                        ? 'text-amber-400 fill-amber-400' 
                        : 'text-slate-200'
                    } transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>

            {isSubmitting && (
              <p className="text-sm text-indigo-600 font-medium animate-pulse">Processing your rating...</p>
            )}
            
            <p className="mt-8 text-xs text-slate-400 uppercase tracking-widest font-semibold">Touch a star to rate</p>
          </div>
        )}

        {step === 'feedback' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">We value your feedback</h2>
            <p className="text-slate-500 mb-6">Tell us what went wrong so we can make it right. Your feedback is sent directly to management.</p>
            
            <textarea
              className="w-full h-32 p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition mb-6 resize-none"
              placeholder="What could we improve?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button
              onClick={handleFeedbackSubmit}
              disabled={isSubmitting || !feedback.trim()}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:bg-slate-300"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Private Feedback'}
            </button>
          </div>
        )}

        {step === 'success' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h2>
            <p className="text-slate-500">Your feedback has been received. We take your experience seriously and will use your input to improve our service.</p>
          </div>
        )}
      </div>

      <div className="mt-12 text-slate-400 text-xs flex items-center gap-4">
        <a href="#/terms" className="hover:text-indigo-600">Terms</a>
        <span>•</span>
        <a href="#/privacy" className="hover:text-indigo-600">Privacy</a>
        <span>•</span>
        <span>Secure Feedback Powered by ReviewBoost</span>
      </div>
    </div>
  );
};

export default Rate;

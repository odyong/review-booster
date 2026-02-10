
import React from 'react';
import { Undo2, Mail } from 'lucide-react';

const Refund: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Undo2 className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-bold text-slate-900">Refund Policy</h1>
      </div>
      
      <div className="bg-indigo-600 rounded-3xl p-8 text-white mb-12">
        <h2 className="text-2xl font-bold mb-4">7-Day Money-Back Guarantee</h2>
        <p className="text-indigo-100 text-lg">
          If you don't get more 5-star reviews within 7 days of using our tool, we will give you a full refund. 
          No questions asked, no complicated forms.
        </p>
      </div>

      <div className="prose prose-slate prose-lg max-w-none space-y-6 text-slate-600">
        <p>
          We are committed to your business success. If you are not satisfied with ReviewBoost for any reason 
          within your first 7 days of subscription, please reach out to us.
        </p>

        <h3 className="text-xl font-bold text-slate-900">How to request a refund:</h3>
        <ul className="list-disc pl-6 space-y-4">
          <li>Send an email to <span className="font-semibold text-slate-900">support@reviewboost.io</span></li>
          <li>Include your account email address.</li>
          <li>Briefly mention why you're requesting the refund (optional, but helps us improve).</li>
        </ul>

        <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-4">
          <Mail className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
          <p className="text-sm">
            Refunds are processed via our payment partner, Paddle. Once initiated, the funds usually appear 
            back in your account within 5-10 business days depending on your bank.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Refund;

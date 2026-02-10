
import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Lock className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>
      </div>
      
      <div className="prose prose-slate prose-lg max-w-none space-y-8 text-slate-600">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What Data We Collect</h2>
          <p>
            To provide our service, we collect minimal information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your business name and Google Review URL.</li>
            <li>The names of customers you provide (for link generation).</li>
            <li>The ratings and feedback text submitted by your customers.</li>
          </ul>
        </section>

        <section className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900">Our Privacy Promise</h2>
          </div>
          <p className="text-slate-700">
            We <span className="font-bold underline">never sell your data</span> to third parties. We do not 
            sell your customer lists. We do not use your customer names for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Data</h2>
          <p>
            Customer data is used strictly for generating your personalized review links and providing 
            you with your feedback reports in the dashboard.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Security</h2>
          <p>
            We use industry-standard encryption to protect all stored information. Our database is 
            secured using row-level security to ensure your data is only accessible by you.
          </p>
        </section>

        <p className="text-xs text-slate-400 mt-12">Last Updated: May 20, 2024</p>
      </div>
    </div>
  );
};

export default Privacy;

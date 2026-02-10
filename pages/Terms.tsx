
import React from 'react';
import { FileText, Shield } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-bold text-slate-900">Terms of Service</h1>
      </div>
      
      <div className="prose prose-slate prose-lg max-w-none space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Use of Service</h2>
          <p>
            ReviewBoost provides a tool for businesses to generate feedback links for their customers. 
            By using our service, you acknowledge that you are solely responsible for the content and 
            distribution of the messages you send from your own mobile device via SMS or WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Native Messaging Responsibility</h2>
          <p>
            Our application generates a unique URL and facilitates the opening of native messaging applications 
            on your device. We do not control, store, or monitor the individual messages sent from your device. 
            You must comply with all local regulations regarding SMS marketing and unsolicited messaging.
          </p>
        </section>

        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900">3. Merchant of Record</h2>
          </div>
          <p className="text-sm">
            Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of 
            Record for all our orders. Paddle provides all customer service inquiries and handles returns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Limitations</h2>
          <p>
            ReviewBoost is intended as a tool to facilitate legitimate feedback collection. Use of the service 
            for spamming or misleading customers is strictly prohibited and may result in account termination.
          </p>
        </section>

        <p className="text-xs text-slate-400 mt-12">Last Updated: May 20, 2024</p>
      </div>
    </div>
  );
};

export default Terms;

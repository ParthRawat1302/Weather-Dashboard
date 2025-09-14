import React from 'react';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TermsPage: React.FC = () => {
  const { actualTheme } = useTheme();

  const lastUpdated = 'December 15, 2024';

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <FileText className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of <span className="gradient-text dark:gradient-text-dark">Service</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className={`${
          actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
        } prose prose-lg max-w-none`}>
          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Scale className="w-6 h-6 text-blue-500 mr-3" />
                Agreement to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                These Terms of Service ("Terms") govern your use of MauSam ("Service") operated by 
                MauSam Inc. ("us", "we", or "our"). By accessing or using our Service, you agree to 
                be bound by these Terms. If you disagree with any part of these terms, then you may not 
                access the Service.
              </p>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-500 mr-3" />
                Service Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                MauSam is a web-based weather application that provides:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Current weather conditions for locations worldwide</li>
                <li>• Detailed weather forecasts and historical data</li>
                <li>• Air quality information and health recommendations</li>
                <li>• Personalized weather preferences and saved locations</li>
                <li>• User account management through Google OAuth</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                User Accounts
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Account Creation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To access premium features, you must create an account using Google OAuth. You are 
                    responsible for maintaining the confidentiality of your account and for all activities 
                    that occur under your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Account Responsibilities
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    You agree to provide accurate, current, and complete information during registration 
                    and to update such information to keep it accurate, current, and complete.
                  </p>
                </div>
              </div>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Acceptable Use Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                You agree not to use the Service:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>• To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>• To submit false or misleading information</li>
                <li>• To upload or transmit viruses or any other type of malicious code</li>
                <li>• To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>• For any obscene or immoral purpose</li>
                <li>• To interfere with or circumvent the security features of the Service</li>
              </ul>
            </section>

            {/* Weather Data Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 text-orange-500 mr-3" />
                Weather Data Disclaimer
              </h2>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  <strong className="text-orange-600 dark:text-orange-400">Important:</strong> Weather 
                  information provided by MauSam is for general informational purposes only and 
                  should not be relied upon for critical decisions.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Weather data is provided by third-party services and may not always be accurate</li>
                  <li>• We do not guarantee the accuracy, completeness, or timeliness of weather information</li>
                  <li>• For critical weather-dependent decisions, consult official meteorological services</li>
                  <li>• We are not liable for any damages resulting from reliance on weather data</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Intellectual Property Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the 
                exclusive property of MauSam Inc. and its licensors. The Service is protected by 
                copyright, trademark, and other laws. Our trademarks and trade dress may not be used in 
                connection with any product or service without our prior written consent.
              </p>
            </section>

            {/* Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Privacy Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your 
                use of the Service, to understand our practices. By using our Service, you agree to the 
                collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>

            {/* Service Availability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Service Availability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We strive to maintain high availability of our Service, but we do not guarantee that the 
                Service will be available at all times. We may experience hardware, software, or other 
                problems or need to perform maintenance related to the Service, resulting in interruptions, 
                delays, or errors.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                In no event shall MauSam Inc., nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                damages, including without limitation, loss of profits, data, use, goodwill, or other 
                intangible losses, resulting from your use of the Service.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Termination
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, without 
                prior notice or liability, under our sole discretion, for any reason whatsoever and without 
                limitation, including but not limited to a breach of the Terms. You may terminate your 
                account at any time by contacting us.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Governing Law
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of the State of California, United 
                States, without regard to its conflict of law provisions. Our failure to enforce any right 
                or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Changes to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will provide at least 30 days notice prior to any new terms 
                taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <p className="text-gray-900 dark:text-white">
                  <strong>Email:</strong> legal@MauSam.com<br />
                  <strong>Address:</strong> Indore, India<br />
                  <strong>Phone:</strong> +91 1234567890
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
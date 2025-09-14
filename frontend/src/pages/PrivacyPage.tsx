import React from 'react';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const PrivacyPage: React.FC = () => {
  const { actualTheme } = useTheme();

  const lastUpdated = 'December 15, 2024';

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy <span className="gradient-text dark:gradient-text-dark">Policy</span>
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
                <Eye className="w-6 h-6 text-blue-500 mr-3" />
                Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                At MauSam, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our weather application and services. 
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy 
                policy, please do not access the application.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <UserCheck className="w-6 h-6 text-blue-500 mr-3" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Personal Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    When you sign in with Google, we collect basic profile information including your name, 
                    email address, and profile photo. This information is provided by Google's OAuth service 
                    and is used to create and maintain your MauSam account.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Usage Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We collect information about how you use our application, including the cities you search for, 
                    your saved locations, preferred units (temperature and wind speed), and general usage patterns. 
                    This helps us improve our service and provide personalized experiences.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Location Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    With your permission, we may collect your device's location to provide local weather information. 
                    You can disable location access at any time through your browser or device settings.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lock className="w-6 h-6 text-blue-500 mr-3" />
                How We Use Your Information
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Provide and maintain our weather services</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Personalize your experience with saved locations and preferences</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Improve our application and develop new features</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Communicate with you about service updates or support</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Ensure security and prevent fraud or abuse</span>
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Data Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• HTTPS encryption for all data transmission</li>
                <li>• Secure JWT tokens with short expiration times</li>
                <li>• HTTP-only cookies for refresh tokens</li>
                <li>• Regular security audits and updates</li>
                <li>• Limited access to personal data on a need-to-know basis</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Third-Party Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                MauSam integrates with the following third-party services:
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li>
                  <strong className="text-gray-900 dark:text-white">Google OAuth:</strong> For secure authentication
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">OpenWeather API:</strong> For weather data (no personal information shared)
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">OpenCage Geocoding:</strong> For location search (optional, no personal information shared)
                </li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Access and review your personal information</li>
                <li>• Update or correct your information through the Settings page</li>
                <li>• Delete your account and associated data</li>
                <li>• Export your data in a portable format</li>
                <li>• Withdraw consent for data processing</li>
                <li>• File a complaint with relevant data protection authorities</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Data Retention
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We retain your personal information only as long as necessary to provide our services and 
                fulfill the purposes outlined in this privacy policy. When you delete your account, we will 
                remove your personal information from our systems within 30 days, except where we are required 
                to retain certain information for legal or regulatory purposes.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Children's Privacy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                MauSam is not intended for children under the age of 13. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe 
                your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by 
                posting the new privacy policy on this page and updating the "Last updated" date. We encourage 
                you to review this privacy policy periodically for any changes.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <p className="text-gray-900 dark:text-white">
                  <strong>Email:</strong> privacy@MauSam.com<br />
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

export default PrivacyPage;
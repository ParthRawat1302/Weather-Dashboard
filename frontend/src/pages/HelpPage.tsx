import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Book, 
  User, 
  Cloud, 
  Shield,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Input from '../components/ui/Input';

const HelpPage: React.FC = () => {
  const { actualTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const helpCategories = [
    {
      id: 'getting-started',
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of using MauSam',
      articles: [
        {
          title: 'How to create an account',
          content: 'Click the "Sign in with Google" button on the homepage or dashboard. You\'ll be redirected to Google\'s secure authentication page where you can sign in with your Google account. Once authenticated, you\'ll have access to all premium features including detailed forecasts, saved locations, and personalized settings.'
        },
        {
          title: 'Understanding weather data',
          content: 'MauSam displays comprehensive weather information including current temperature, feels-like temperature, humidity, wind speed and direction, atmospheric pressure, visibility, UV index, and sunrise/sunset times. All data is sourced from OpenWeather API and updated every 10 minutes.'
        },
        {
          title: 'Navigating the dashboard',
          content: 'The dashboard is your central hub for weather information. The main area shows current weather conditions, while authenticated users can access hourly forecasts, 7-day outlook, and air quality data. Use the search bar to find weather for any city worldwide.'
        }
      ]
    },
    {
      id: 'account-settings',
      icon: User,
      title: 'Account & Settings',
      description: 'Manage your profile and preferences',
      articles: [
        {
          title: 'Changing temperature units',
          content: 'Go to Settings and select your preferred temperature unit (Celsius or Fahrenheit) and wind speed unit (km/h or mph). Your preferences will be saved and applied across all weather displays.'
        },
        {
          title: 'Managing saved locations',
          content: 'Save your favorite locations by searching for a city and clicking the "Add Location" button. Manage your saved locations in the Settings page where you can remove locations or set a default location.'
        },
        {
          title: 'Updating your profile',
          content: 'Visit the Settings page to update your display name and other profile information. Your Google account information (email and photo) is automatically synced and cannot be changed within MauSam.'
        }
      ]
    },
    {
      id: 'weather-features',
      icon: Cloud,
      title: 'Weather Features',
      description: 'Explore all weather capabilities',
      articles: [
        {
          title: 'Reading hourly forecasts',
          content: 'The 24-hour forecast shows temperature trends, weather conditions, and precipitation chances for each hour. The interactive chart helps visualize temperature changes throughout the day.'
        },
        {
          title: 'Understanding Air Quality Index (AQI)',
          content: 'AQI is rated from 1-5: 1 (Good), 2 (Fair), 3 (Moderate), 4 (Poor), 5 (Very Poor). We also show detailed pollutant levels including CO, NO₂, O₃, SO₂, PM2.5, and PM10 with health recommendations.'
        },
        {
          title: 'Using the search feature',
          content: 'Type at least 2 characters to see city suggestions. The autocomplete feature searches globally and shows results with country and state information. Click any suggestion to view weather for that location.'
        }
      ]
    },
    {
      id: 'privacy-security',
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Learn about data protection and security',
      articles: [
        {
          title: 'How we protect your data',
          content: 'MauSam uses enterprise-grade security including HTTPS encryption, secure JWT tokens, and HTTP-only cookies. We only collect necessary information and never share your personal data with third parties.'
        },
        {
          title: 'Google OAuth security',
          content: 'We use Google\'s OAuth 2.0 for secure authentication. We only access your basic profile information (name, email, photo) and never store your Google password or access other Google services.'
        },
        {
          title: 'Data retention policy',
          content: 'We store your profile information and saved locations only as long as your account is active. You can delete your account and all associated data at any time by contacting our support team.'
        }
      ]
    }
  ];

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <HelpCircle className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Help <span className="gradient-text dark:gradient-text-dark">Center</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of MauSam
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles..."
              className="pl-12 text-lg py-4"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={`${
                actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
              } animate-slide-up`}
            >
              <button
                onClick={() => toggleSection(category.id)}
                className="w-full flex items-center justify-between p-2 hover:bg-white/10 dark:hover:bg-black/10 rounded-xl transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <category.icon className="w-8 h-8 text-blue-500" />
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>
                {expandedSection === category.id ? (
                  <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                )}
              </button>

              {expandedSection === category.id && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  {category.articles.map((article, index) => (
                    <div
                      key={index}
                      className="bg-white/10 dark:bg-black/10 rounded-xl p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {article.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {searchQuery && filteredCategories.length === 0 && (
          <div className={`${
            actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
          } text-center py-12`}>
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find any help articles matching "{searchQuery}". 
              Try different keywords or browse our categories above.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear search and show all articles
            </button>
          </div>
        )}

        {/* Contact Support */}
        <div className={`${
          actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
        } text-center mt-12`}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still need help?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-primary inline-flex items-center justify-center space-x-2"
            >
              <span>Contact Support</span>
            </a>
            <a
              href="mailto:support@mausam.com"
              className="btn-secondary inline-flex items-center justify-center space-x-2"
            >
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
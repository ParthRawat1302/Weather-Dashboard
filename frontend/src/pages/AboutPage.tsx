import React from 'react';
import { Cloud, Globe, Shield, Zap, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AboutPage: React.FC = () => {
  const { actualTheme } = useTheme();

  const features = [
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access weather data for any location worldwide with our comprehensive API integration.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is protected with enterprise-grade security and privacy measures.'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Get the latest weather information with real-time data updates every few minutes.'
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Designed with users in mind, providing intuitive and accessible weather information.'
    }
  ];

  const team = [

    {
      name: 'Parth Rawat',
      role: 'Full-Stack Developer',
      description: 'Full-stack developer passionate about creating scalable weather intelligence platforms.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Cloud className="w-20 h-20 text-blue-500 float-animation" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About                <span className="text-7xl font-bold text-shadow-lg">
              <span className="gradient-text dark:gradient-text-dark">Mau</span>
              <span className="text-gray-900 dark:text-white">Sam</span>
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're on a mission to make weather information more accessible, accurate, 
            and actionable for everyone, everywhere.
          </p>
        </div>

        {/* Mission Section */}
        <div className={`${
          actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
        } mb-16`}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              MauSam was born from the belief that everyone deserves access to accurate, 
              real-time weather information. We combine cutting-edge meteorological data with 
              intuitive design to create a weather platform that's both powerful and easy to use. 
              Whether you're planning your day, managing outdoor activities, or making critical 
              business decisions, MauSam provides the weather intelligence you need.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`${
                  actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
                } text-center animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Meet Our Team
          </h2>
          <div className="flex flex-cols-1 sm:flex-cols-2 md:flex-cols-3 gap-8 justify-center justify-items-center">
            {team.map((member, index) => (
              <div
                key={member.name}
                className={`${
                  actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
                } text-center animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/30"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`${
          actualTheme === 'dark' ? 'weather-card-dark' : 'weather-card'
        } text-center`}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            MauSam by the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">10M+</div>
              <div className="text-gray-600 dark:text-gray-400">API Calls Daily</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500 mb-2">195</div>
              <div className="text-gray-600 dark:text-gray-400">Countries Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">500K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
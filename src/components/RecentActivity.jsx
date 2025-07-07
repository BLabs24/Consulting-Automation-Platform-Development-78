import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMessageCircle, FiFileText, FiUsers, FiCheckCircle, FiClock } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'interview',
      title: 'Interview completed with John Smith',
      description: 'TechCorp Digital Transformation',
      time: '2 hours ago',
      icon: FiUsers,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 2,
      type: 'document',
      title: 'SOP document uploaded',
      description: 'Process Documentation v2.1',
      time: '4 hours ago',
      icon: FiFileText,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 3,
      type: 'comment',
      title: 'New comment on Friction Card',
      description: 'Legacy system integration issues',
      time: '6 hours ago',
      icon: FiMessageCircle,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 4,
      type: 'task',
      title: 'Risk assessment completed',
      description: 'RetailChain Process Optimization',
      time: '1 day ago',
      icon: FiCheckCircle,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 5,
      type: 'schedule',
      title: 'Meeting scheduled',
      description: 'Stakeholder review session',
      time: '2 days ago',
      icon: FiClock,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-3"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
                <SafeIcon icon={activity.icon} className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
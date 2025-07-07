import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiFileText, FiAlertTriangle, FiShield, FiClock, FiCalendar } = FiIcons;

const ProjectMetrics = ({ project }) => {
  const metrics = [
    {
      label: 'Interviews',
      value: `${project.metrics.interviewsCompleted}/${project.metrics.interviewsScheduled}`,
      icon: FiUsers,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: 'SOPs Received',
      value: project.metrics.sopsReceived,
      icon: FiFileText,
      color: 'text-green-600 bg-green-50'
    },
    {
      label: 'Friction Cards',
      value: project.metrics.frictionCards,
      icon: FiAlertTriangle,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      label: 'Risks Identified',
      value: project.metrics.risksIdentified,
      icon: FiShield,
      color: 'text-red-600 bg-red-50'
    },
    {
      label: 'Hours Tracked',
      value: project.metrics.timeSpentHours,
      icon: FiClock,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Project Metrics</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.color}`}>
                  <SafeIcon icon={metric.icon} className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">{metric.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <SafeIcon icon={FiCalendar} className="w-4 h-4" />
            <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMetrics;